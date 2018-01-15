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
  addMode = false;
  editButtonFlag = false;

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
//use to create a new office in office list
  addNewOffice() {
    this.addMode = true;
    this.editMode = true;
    this.editButtonFlag = true;
    //this.buildFormsArray();
    const newData = [{
       'id': 0, 
      'locationName' : '',
       'streetAddressLine1': '',
       'streetAddressLine2': '',
       'cityName': '',
       'stateProvinceCode': '',
       'postalCode': '',
       'phone': this._fb.group({
          number: []
        }),
       'Manager': ''
    }];
    const formArray = <FormArray>this.officeFormContainer.controls['offices'];
      newData.forEach(item => formArray.controls.push(this._fb.group(item)));
   
  }

  buildFormsArray() {
    return this._fb.group({
      offices: this._fb.array([]),
      phone: this._fb.group({
        number: []
      })
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
    let newData = (<FormArray>this.officeFormContainer.controls['offices']).controls[index].value;
    this._commonService.updateOffice(newData);
    const indexVal = this.officeList.findIndex(e1 => e1.id === newData.id);
    if(indexVal > -1) {
      this.officeList[indexVal] = newData;
    } else {
      newData['id'] = this.officeList.length + 1;
      this.officeList.push(newData);
    }
    this._commonService.getUpdatedOfficeList(Observable.of(this.officeList));
    this.switchMode();

  }

  switchMode(id?) {
    this.addMode = false;
    if (!this.editMode) {
      this.editMode = true;
      this.currentEditId = id;
    } else {
      this.editMode = false;
      this.currentEditId = null;
    }
    this.editButtonFlag = false;
  }

}
