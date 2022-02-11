import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private render: Renderer2){}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  dropped(e: any): void {
    console.log("Elemento soltado");
    console.log(e);
  }
}
