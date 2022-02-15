import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @ViewChild('textarea') textarea!: ElementRef
  @ViewChild('counter') counter!: ElementRef
  @ViewChild('delete') delete!: ElementRef

  view: boolean = true;

  constructor(private render: Renderer2) { }

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

    this.render.listen(remove,'click',(e)=>{
      this.render.removeChild('document',e.path[4]);
    })
  }
}
