import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @ViewChild('textarea') textarea: any;
  @ViewChild('counter') counter: any;

  constructor(private render: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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
  }

  dropped(e: any): void { 
    console.log(e);
  }
}
