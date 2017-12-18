import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class PersonnelCardComponent implements OnInit {
  @Input() personnel: Person;
  @Input() index: number;
  @ViewChild('dataContainer') dataContainer: ElementRef;
  personnelForm: FormGroup;
  namePattern = /^[a-zA-Z'-]+$/;
  datePattern = /^\d{1,2}\-\d{1,2}\-\d{4}$/;
  nameValidator = ['', Validators.compose([Validators.required,
  Validators.minLength(2),
  Validators.maxLength(25),
  Validators.pattern(this.namePattern)])];
  editMode = false;
  cardId: String;
  constructor(private _commonService: CommonService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.hydrateForm(this.personnel);


  }


  buildForm() {
    this.personnelForm = this._fb.group({
      id: 0,
      firstName: this.nameValidator,
      lastName: this.nameValidator,
      birthDate: [''],
      hireDate: [''],
      officeLocation: new Office(),
      phone: [''],
      role: ''
    });
  }

  hydrateForm(data: Person) {
    if (!data.id) {
      this.personnel.id = this.index + 1;
      this.editMode = true;
    } 
    
    this.cardId = `card${this.personnel.id}`;
    this.personnelForm.patchValue(this.personnel);
  }

  updatePersonnel() {
    console.log(this.personnelForm.valid)
    if (this.personnelForm.valid) {
        this.personnel = this.personnelForm.value;
        this._commonService.updatePersonnel(this.personnelForm.value);
        this.editMode = false;
    }

  }



}
