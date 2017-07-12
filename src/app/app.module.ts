import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler } from '@angular/core';
import { JitCompilerFactory } from '@angular/compiler';

import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { DynamicModule } from './dynamic/dynamic.module';
import { UiModule } from './ui/ui.module';
import { ModulesModule } from './modules/modules.module';

// Need an exported function to make it work with AOT:
export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}

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
    DynamicModule.forRoot()
  ],
  providers: [
    { provide: Compiler, useFactory: createJitCompiler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
