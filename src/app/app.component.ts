import { 
  Component,
  ViewContainerRef,
  ComponentFactoryResolver

} from '@angular/core';

import { NoteComponent } from './components/note/note.component';
import { NotesHandleService } from './services/notes-handle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private vcRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private noteHandler: NotesHandleService){}

  ngOnInit(): void {
    this.noteHandler.openDB();
  }

  ngAfterViewInit(): void {
  }

  createNote(): void {
    const note = this.resolver.resolveComponentFactory(NoteComponent);
    const element = this.vcRef.createComponent(note);
  }
}
