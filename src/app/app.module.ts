import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler } from '@angular/core';
// old mock
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { Http, BaseRequestOptions } from '@angular/http';
// import { MockService } from './core/mock-backend/mock.service';
import { MaterialsService } from './core/mock-backend/materials.service';

// new mock
import { HttpClientModule } from '@angular/common/http';

import { JitCompilerFactory } from '@angular/compiler';

import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { DynamicModule } from './dynamic/dynamic.module';
import { UiModule } from './ui/ui.module';
import { ModulesModule } from './modules/modules.module';

import { MetaFactory } from '../app/core/decorator/scalable.decorator';

// Need an exported function to make it work with AOT:
export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}

/*
function MockBackendFactory(backend: MockBackend,
                            options: BaseRequestOptions) {
    backend.connections.subscribe((connection: MockConnection) => {
        setTimeout(() => {
        }, 100);
    });
    return new Http(backend, options);
}

export let MockBackendProvider = {
    provide: Http,
    deps: [MockBackend, BaseRequestOptions],
    useFactory: MockBackendFactory
}
*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule.forRoot(),
    UiModule,
    ModulesModule,
    DynamicModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    { provide: Compiler, useFactory: createJitCompiler },
    // MockService,
    // MockBackend,
    // BaseRequestOptions,
    // MockBackendProvider,
    MaterialsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
