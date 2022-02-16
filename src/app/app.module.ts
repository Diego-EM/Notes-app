import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { DotComponent } from './components/dot/dot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteContainerDirective } from './directives/note-container.directive';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    DotComponent,
    NoteContainerDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
