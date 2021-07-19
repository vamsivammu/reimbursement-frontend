import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-value-display',
  templateUrl: './key-value-display.component.html',
  styleUrls: ['./key-value-display.component.css']
})
export class KeyValueDisplayComponent implements OnInit {

  @Input("name") name:string|undefined;
  @Input("value") value:string|number|undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
