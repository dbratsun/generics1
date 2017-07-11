import { DynamicModule } from './dynamic.module';
import { Component, ComponentFactory, NgModule, Input, Injectable, Compiler } from '@angular/core';
import { JitCompiler } from '@angular/compiler';
import { EditorsModule } from '../editors/editors.module';
import * as _ from 'lodash';
// import 'reflect-metadata/Reflect';

export interface IHaveDynamicData {
    /* public */ entity: any;
}

@Injectable()
export class DynamicTypeBuilder {

  private _cacheOfFactories: {[templateKey: string]: ComponentFactory<IHaveDynamicData>} = {};

// wee need Dynamic component builder
  constructor(
    protected compiler: Compiler // JitCompiler
  ) { }

  // this object is singleton - so we can use this as a cache

  public createComponentFactory(template: string): Promise<ComponentFactory<IHaveDynamicData>> {

    let factory = this._cacheOfFactories[template];

    if (factory) {
        console.log('Module and Type are returned from cache')
        return new Promise((resolve) => {
            resolve(factory);
        });
    }
    // unknown template ... let's create a Type for it
    const type   = this.createNewComponent(template);
    const module = this.createComponentModule(type);
    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) => {
                factory = _.find(moduleWithFactories.componentFactories, { componentType: type });

                this._cacheOfFactories[template] = factory;

                resolve(factory);
            });
    });
  }

  protected createNewComponent (tmpl: string) {
      @Component({
          selector: 'app-dynamic-component',
          template: tmpl,
      })
      class CustomDynamicComponent implements IHaveDynamicData {
          @Input() public entity: any;
      };
      // a component for this particular template
      return CustomDynamicComponent;
  }

  protected createComponentModule (componentType: any) {
      @NgModule({
        imports: [
          EditorsModule, // there are 'text-editor', 'string-editor'...
          DynamicModule.forRoot()
        ],
        declarations: [
          componentType
        ],
      })
      class RuntimeComponentModule {
      }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}
