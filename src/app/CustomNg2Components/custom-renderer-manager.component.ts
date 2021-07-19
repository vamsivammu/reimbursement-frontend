import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import { IBill } from '../utils/interfaces';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomRenderManagerComponent implements ViewCell, OnInit {

  renderValue: string = '';

  @Input() value: string | number = '';
  @Input() rowData: IBill = {} as IBill;

  ngOnInit() {
    if(this.rowData.managerPending){
        this.renderValue = "Pending";
    }else{
        this.renderValue = this.rowData.managerAccepted?"Accepted":'Rejected';
    }
  }

}