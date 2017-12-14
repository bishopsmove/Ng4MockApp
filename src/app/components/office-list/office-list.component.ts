import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { CommonService } from '../../service/common-service.service';
import { Observable } from 'rxjs/Observable';
import { Office } from '../../models/office';
import { } from '@angular/forms/src/model';


@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit {
  officeList: Office[];
  stateProvinceList: any[];
  editMode = false;
  currentEditId;

  officeFormContainer = this.buildFormsArray();
  constructor(private _commonService: CommonService, private _fb: FormBuilder) { }

  ngOnInit() {
    this._commonService.getOffices().subscribe((data) => {
      this.officeList = data;
      this.hydrateArray(data);
    });

    this._commonService.getStateProvinces().subscribe((data) => {
      this.stateProvinceList = data;
    });


  }

  buildFormsArray() {
    return this._fb.group({
      offices: this._fb.array([])
    });
  }

  hydrateArray(newData) {

    if (newData) {
      // If input array newData is initialized, init a formGroup and pass each array item into formContainer
      const formArray = <FormArray>this.officeFormContainer.controls['offices'];
      newData.forEach(item => formArray.controls.push(this._fb.group(item)));

    }
  }

  updateOffice(index) {
    // Use the formGroup index to access the current formGroup value from the formContainer array and pass to updateOffice method
    const newData = (<FormArray>this.officeFormContainer.controls['offices']).controls[index].value;
    this._commonService.updateOffice(newData);
    this.switchMode();

  }

  switchMode(id?) {
    if (!this.editMode) {
      this.editMode = true;
      this.currentEditId = id;
    } else {
      this.editMode = false;
      this.currentEditId = null;
    }

  }

}
