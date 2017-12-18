import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import 'rxjs/Rx';

import { Person } from '../../models/person';
import { CommonService } from '../../service/common-service.service';
import { Office } from '../../models/office';

@Component({
  selector: 'app-personnel-card',
  templateUrl: './personnel-card.component.html',
  styleUrls: ['./personnel-card.component.css']
})
export class PersonnelCardComponent implements OnInit, OnChanges {
  @Input() personnel: Person;
  @Input() addModeFlag;
  @ViewChild('dataContainer') dataContainer: ElementRef;
  personnelForm: FormGroup;
  namePattern = /^[a-zA-Z'-]+$/;
  datePattern = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
  nameValidator = ['', Validators.compose([Validators.required,
  Validators.minLength(2),
  Validators.maxLength(25),
  Validators.pattern(this.namePattern)])];
  editMode = false;
  cardId: String;
  constructor(private _commonService: CommonService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    // if(this.addModeFlag) {
      
    // }

    this.hydrateForm(this.personnel);
    this.cardId = `card${this.personnel.id}`;

  }

  ngOnChanges() {
    if(this.addModeFlag) {
      let newData = {
        id: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      hireDate: '',
      officeLocation: ''
      }
      //this.personnelForm.setValue(newData);
      console.log("this.personnelForm", this.personnelForm)
    //alert(0)
    }
  }

  buildForm() {
    this.personnelForm = this._fb.group({
      id: 0,
      firstName: this.nameValidator,
      lastName: this.nameValidator,
      birthDate: ['', Validators.pattern(this.datePattern)],
      hireDate: ['', Validators.pattern(this.datePattern)],
      officeLocation: new Office()
    });
  }

  hydrateForm(data: Person) {
    if (data) {
      this.personnelForm.patchValue(data);
    }
  }

  updatePersonnel() {
    this._commonService.updatePersonnel(this.personnelForm.value);
    this.editMode = false;
  }

}
