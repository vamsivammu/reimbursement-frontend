import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import { IBill } from '../utils/interfaces';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomRenderAdminComponent implements ViewCell, OnInit {

  renderValue: string = '';

  @Input() value: string | number = '';
  @Input() rowData: IBill = {} as IBill;

  ngOnInit() {
    
    if(this.rowData.adminPending){
        this.renderValue = (this.rowData.managerPending || this.rowData.managerAccepted)?"Pending":"Closed";
    }else{
        this.renderValue = this.rowData.adminAccepted?"Accepted":"Rejected";
    }
  }

}