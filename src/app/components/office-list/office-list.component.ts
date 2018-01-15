import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonService } from '../../service/common-service.service';
import { Observable } from 'rxjs/Observable';
import { Office } from '../../models/office';
import { } from '@angular/forms/src/model';
import { Person } from '../../models/person';


@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit {
  officeList: Office[];
  stateProvinceList: any[];
  editMode = false;
  // create a new flag to add mode
  addMode = false;
  currentEditId;
  managerList;
  officeFormContainer = this.buildFormsArray();
  phonePattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
  zipCodePattern = /^[0-9]{5}(-[0-9]{4})?$/;
  constructor(private _commonService: CommonService, private _fb: FormBuilder) { }

  ngOnInit() {
    this._commonService.getOffices().subscribe((data) => {
      this.officeList = data;
      this.hydrateArray(data);
    });

    this._commonService.getPersonnel().subscribe((data) => {
      this.managerList = data.filter(item =>  item.role === 'Manager');
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
      newData.forEach(item => formArray.controls.push(this.formBuilder(item)));

    }
  }

  formBuilder(item): FormGroup {
    return  this._fb.group({
      id: item.id,
      locationName : item.locationName,
      streetAddressLine1: item.streetAddressLine1,
      streetAddressLine2: item.streetAddressLine2,
      cityName: item.cityName,
      postalCode: item.postalCode,
      stateProvinceCode: item.stateProvinceCode,
      phone: this._fb.group({
        number: item.phone.number
      }),
      Manager: item.Manager
    });
  }

  updateOffice(index) {
    if (this.officeFormContainer.valid) {
      // Use the formGroup index to access the current formGroup value from the formContainer array and pass to updateOffice method
    const newData = (<FormArray>this.officeFormContainer.controls['offices']).controls[index].value;
    this._commonService.updateOffice(newData);
    this.addMode = false;
    this.editMode = false;
    }
  }

  switchMode(id?) {
    if (!this.editMode && !this.addMode) {
      this.editMode = true;
      this.currentEditId = id;
    } else if (this.addMode) {

      // if not want to add new row then on click of cancle pop the last formGroup from formArray
      this.addMode = false;
      const formArray = <FormArray>this.officeFormContainer.get('offices');
      formArray.controls.pop();
    } else {
      this.editMode = false;
      this.currentEditId = null;
    }

  }

  // inserted a new formGroup at the end of formArray with default values and make id as position in formArray

  addNewLocation() {
    this.editMode = false;
    const formArray = <FormArray>this.officeFormContainer.controls['offices'];
    this.currentEditId = formArray.controls.length + 1;
    formArray.push(this._fb.group({
      id : [formArray.controls.length + 1],
      locationName: [''],
      streetAddressLine1 : [''],
      streetAddressLine2 : [''],
      cityName : [''],
      stateProvinceCode : [''],
      postalCode : ['', Validators.compose([Validators.required, Validators.pattern(this.zipCodePattern)])],
      Manager : [''],
      phone: this._fb.group({
       // number: ['', Validators.compose([Validators.required, Validators.pattern(this.phonePattern)])]
       number: ['']
      })
    }));
    this.addMode = true;
  }

}
