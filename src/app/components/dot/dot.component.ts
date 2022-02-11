import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.css']
})
export class DotComponent implements OnInit {

  @Input('background') background: string = "#000";

  constructor() { }

  ngOnInit(): void {
  }

}
