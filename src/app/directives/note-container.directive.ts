import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[NoteContainer]'
})
export class NoteContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
