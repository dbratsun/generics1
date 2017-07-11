import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler } from '@angular/core';
import { /* COMPILER_PROVIDERS, JitCompiler, CompileMetadataResolver, CompilerConfig,*/ JitCompilerFactory } from '@angular/compiler';

import { AppComponent } from './app.component';
import { DynamicModule } from './dynamic/dynamic.module';

import { MaterialEditComponent} from './modules/material/material-edit.component';

// Need an exported function to make it work with AOT:
export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
    MaterialEditComponent
  ],
  imports: [
    BrowserModule,
    DynamicModule.forRoot()
  ],
  providers: [
    // COMPILER_PROVIDERS
    // JitCompiler,
    // CompileMetadataResolver,
    // CompilerConfig
    // JitCompilerFactory,
    // JitCompiler
    { provide: Compiler, useFactory: createJitCompiler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
