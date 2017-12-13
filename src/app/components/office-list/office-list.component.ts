import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../service/common-service.service';
import { Observable } from 'rxjs/Observable';
import { Office } from '../../models/office';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit {

  officeList: Observable<Office[]>;
  editMode = false;
  currentEditId;
  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this.officeList = this._commonService.getOffices();
  }

  updateOffice(index) {
    this.officeList.forEach(store => store.filter((entry, i) => i === index).forEach(data => this._commonService.updateOffice(data)));
  }

  switchMode(id) {
    if (!this.editMode) {
      this.editMode = true;
      this.currentEditId = id;
    }
    else {
      this.editMode = false;
      this.currentEditId = null;
    }

  }

}
