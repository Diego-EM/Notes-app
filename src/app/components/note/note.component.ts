import { Component, OnInit, ViewChild, Renderer2, ElementRef, Input } from '@angular/core';
import { NotesHandleService } from 'src/app/services/notes-handle.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @ViewChild('note') note!: ElementRef
  @ViewChild('textarea') textarea!: ElementRef
  @ViewChild('counter') counter!: ElementRef
  @ViewChild('delete') delete!: ElementRef

  @Input('textvalue') textvalue: string = "";
  @Input('noteid') noteid: number|null = null;

  constructor(
    private render: Renderer2,
    private noteHandler: NotesHandleService
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const remove = this.delete.nativeElement;
    const counter = this.counter.nativeElement;
    const textarea = this.textarea.nativeElement;
    let max = 300;
    counter.textContent = `${textarea.value.length}/${max}`;
    this.render.listen(textarea,'input',()=>{
      this.textarea.nativeElement.style.height = 'auto';
      this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
      //Counter changes
      if (textarea.value.length > max) textarea.value = textarea.value.substring(0,max);
      counter.textContent = `${textarea.value.length}/${max}`;
    })
    this.render.listen(textarea,'change',()=>{
      const textcontent: string = this.textarea.nativeElement.value;
      const note = this.note.nativeElement;
      if (note.id === 'null'){
        if(textcontent.length > 0) {
          this.noteHandler.addNote(textcontent);
          this.noteHandler.getLastKey()
            .then( (key: number) => this.noteid = key);
        }
      } else {
        if(textcontent.length > 0) {
          this.noteHandler.updateNote(textcontent, this.noteid);
        } else {
          this.noteHandler.deleteNote(this.noteid);
          note.id = "null";
        }
      }
      this.textvalue = textcontent;
    })

    this.render.listen(remove,'click',(e)=>{
      const note = this.note.nativeElement;
      const parent = this.render.parentNode(note);
      if(this.noteid !== null) this.noteHandler.deleteNote(this.noteid)
      this.render.removeChild('document',parent);
    })
  }

}
