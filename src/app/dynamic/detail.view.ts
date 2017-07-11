import { Component, ComponentRef,ViewChild,ViewContainerRef}   from '@angular/core';
import { AfterViewInit,OnInit,OnDestroy}          from '@angular/core';
import { OnChanges,SimpleChange,ComponentFactory} from '@angular/core';

import { IHaveDynamicData, DynamicTypeBuilder } from './type.builder';
import { DynamicTemplateBuilder }               from './template.builder';

import { Entity, Entity1, SampleEntity } from '../entity';

/*
function logType(target : any, key : string) {
      var t = Reflect.getMetadata("design:type", target, key);
      console.log(`${key} type: ${t.name}`);
}
*/

@Component({
  selector: 'dynamic-detail',
  template: `
    <div>
        check/uncheck to use INPUT vs TEXTAREA:
        <input type="checkbox" #val (click)="refreshContent(val.checked)" /><hr />
        <div #dynamicContentPlaceHolder></div>  <hr />
        entity: <pre>{{entity | json}}</pre>
    </div>
`,
})
export class DynamicDetail implements AfterViewInit, OnChanges, OnDestroy
{ 
    // reference for a <div> with #dynamicContentPlaceHolder
    @ViewChild('dynamicContentPlaceHolder', {read: ViewContainerRef}) 
    protected dynamicComponentTarget: ViewContainerRef;
    // this will be reference to dynamic content - to be able to destroy it
    protected componentRef: ComponentRef<IHaveDynamicData>;
    
    // until ngAfterViewInit, we cannot start (firstly) to process dynamic stuff
    protected wasViewInitialized = false;
    
    // example entity ... to be recieved from other app parts
    // this is kind of candiate for @Input
    
    // protected entity: Entity = new Entity("ABC123", "A description of this Entity", 23, 1234)

    // protected entity: Entity1 = new Entity1("ABC123", 123);

    protected entity: SampleEntity = new SampleEntity(1, "abc123", "this is abc123");

    // wee need Dynamic component builder 11
    constructor(
        protected typeBuilder: DynamicTypeBuilder,
        protected templateBuilder: DynamicTemplateBuilder
    ) {}

   /** Get a Factory and create a component */ 
    
    protected refreshContent(useTextarea: boolean = false){
      
      if (this.componentRef) {
          this.componentRef.destroy();
      }
      
      // here we get a TEMPLATE with dynamic content === TODO
      var template = this.templateBuilder.prepareTemplate(this.entity, useTextarea);

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
            let component = this.componentRef.instance;

            component.entity = this.entity;
            //...
        });
    }

    /** IN CASE WE WANT TO RE/Gerante - we need cean up */

    // this is the best moment where to start to process dynamic stuff
    public ngAfterViewInit(): void
    {
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
        this.refreshContent();
    }
    public ngOnDestroy(){
      if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
      }
    }
  
  
}
