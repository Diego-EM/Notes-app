import { 
  Component,
  ViewContainerRef,
  ComponentFactoryResolver

} from '@angular/core';

import { NoteComponent } from './components/note/note.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private vcRef: ViewContainerRef, private resolver: ComponentFactoryResolver){}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  createNote(): void {
    const note = this.resolver.resolveComponentFactory(NoteComponent);
    const element = this.vcRef.createComponent(note);
    console.log(element);
  }
}
