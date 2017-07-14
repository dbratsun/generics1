import { Component, Input, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import { OnChanges, SimpleChange, ComponentFactory} from '@angular/core';

import { IHaveDynamicData, DynamicTypeBuilder } from './type.builder';
import { DynamicTemplateBuilder } from './template.builder';

import { Material } from '../models/material.entity';

@Component({
  selector: 'app-dynamic-detail',
  template: `
    <div>
        <div #dynamicContentPlaceHolder></div>
        <hr />
        entity: <pre>{{entity | json}}</pre>
    </div>
  `
})
export class DynamicDetailComponent implements /* AfterViewInit,*/ OnChanges, OnDestroy {
    @Input() protected entity: any;
    // reference for a <div> with #dynamicContentPlaceHolder
    @ViewChild('dynamicContentPlaceHolder', { read: ViewContainerRef })
    protected dynamicComponentTarget: ViewContainerRef;
    // this will be reference to dynamic content - to be able to destroy it
    protected componentRef: ComponentRef<IHaveDynamicData>;

    // until ngAfterViewInit, we cannot start (firstly) to process dynamic stuff
    protected wasViewInitialized = false;

    // example entity ... to be recieved from other app parts
    // this is kind of candiate for @Input

    // protected entity: Entity = new Entity("ABC123", "A description of this Entity", 23, 1234)

    // protected entity: Entity1 = new Entity1("ABC123", 123);

    // protected entity: Material = new Material(1, 1234567, 'this is abc123', 'this is a Description');

    // wee need Dynamic component builder 11
    constructor(
        protected typeBuilder: DynamicTypeBuilder,
        protected templateBuilder: DynamicTemplateBuilder
    ) { }

    /** Get a Factory and create a component */

    protected refreshContent(useTextarea: boolean = false) {

      if (this.componentRef) {
          this.componentRef.destroy();
      }

      // here we get a TEMPLATE with dynamic content === TODO
      const template = this.templateBuilder.prepareTemplate(this.entity, useTextarea);

      // here we get Factory (just compiled or from cache)
      this.typeBuilder
          .createComponentFactory(template)
          .then((factory: ComponentFactory<IHaveDynamicData>) =>
        {
            // Target will instantiate and inject component (we'll keep reference to it)
            this.componentRef = this
                .dynamicComponentTarget
                .createComponent(factory);

            // let's inject @Inputs to component instance
            const component = this.componentRef.instance;

            component.entity = this.entity;
            // ...
        });
    }

    /** IN CASE WE WANT TO RE/Gerante - we need cean up */

    // this is the best moment where to start to process dynamic stuff

    public ngAfterViewInit(): void
    {
        if (this.wasViewInitialized) {
            return;
        }
        this.wasViewInitialized = true;
        this.refreshContent();
    }

    // wasViewInitialized is an IMPORTANT switch
    // when this component would have its own changing @Input()
    // - then we have to wait till view is intialized - first OnChange is too soon
    public ngOnChanges(changes: {[key: string]: SimpleChange}): void
    {
        if (this.wasViewInitialized) {
            return;
        }
        this.wasViewInitialized = true;
        this.refreshContent();
    }

    public ngOnDestroy(){
      if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
      }
    }


}

