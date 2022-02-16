import { 
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';

import { NoteComponent } from './components/note/note.component';
import { NoteContainerDirective } from './directives/note-container.directive';
import { NotesHandleService } from './services/notes-handle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(NoteContainerDirective) container!: NoteContainerDirective;

  constructor(private noteHandler: NotesHandleService,){}  

  ngOnInit(): void {
    this.noteHandler.openDB();
  }

  ngAfterViewInit(): void {
    this.noteHandler.getNotes('readonly',(noteData: any)=>{
      this.createNote(noteData.textcontent, noteData.x, noteData.y, noteData.key);
    });
  }

  createNote(textcontent?: string, x?: number, y?:number, id?: number): void {
    setTimeout(()=>{
      const containerRef = this.container.viewContainerRef;
      const componentRef = containerRef.createComponent(NoteComponent);
      if (textcontent !== undefined && id !== undefined && x !== undefined && y !== undefined){
        componentRef.instance.textvalue = textcontent;
        componentRef.instance.position.x = x;
        componentRef.instance.position.y = y;
        componentRef.instance.noteid = id;
      }
    }, 0)
  }
}
