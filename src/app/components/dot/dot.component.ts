import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.css'],
  animations: [
    trigger('hover',[
      state('enter', style({
        transform: 'scale(1.1)'
      })),
      state('leave', style({
        transform: 'scale(1)'
      })),
      state('clicked', style({
        transform: 'scale(0.8)',
        filter: 'hue-rotate(22deg)'
      }))
      ,
      transition('leave => enter',animate('150ms ease-in')),
      transition('enter => leave',animate('100ms ease-out')),
      transition('* => clicked',animate('150ms ease-in')),
      transition('clicked => *',animate('100ms ease-out'))
    ])
  ]
})
export class DotComponent implements OnInit {

  @Input('background') background: string = "#000";
  @Input('imgSrc') src: string = "";
  @Input('imgAlt') alt: string = "Icon";

  hover: string = 'leave';

  constructor() { }

  ngOnInit(): void {
  }

  changeState(): void {
    this.hover = (this.hover === 'leave') ? 'enter' : 'leave';
  }

}
