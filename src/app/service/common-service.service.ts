import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Person } from '../models/person';
import { Office } from '../models/office';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CommonService {

  personnelStore: Observable<Person[]>;
  officeStore: Observable<Office[]>;
  stateProvinceStore: Observable<any[]>;
  updatePersonalListSubject = new Subject();

  constructor(private _http: Http) { }

  getPersonnel(): Observable<Person[]> {
    if (!this.personnelStore) {
      this.personnelStore = this._http.get('../../assets/data/personnel.json')
        .map((res: Response) => res.json());
    }
    return this.personnelStore;
  }

//return a new json for add personal card
  addPersonnalData(): Person {
    return {
        "id": 0,
        "firstName": "",
        "lastName": "",
        "birthDate": new Date(),
        "hireDate": new Date(),
        "officeLocation": null,
        'phoneNo': "",
        'role': ""
      }
  }
//call when click on add button in personal list
  addNewPersonnalList(): Observable<Person[]> {
      return Observable.create((observer: any) => {
        observer.next(this.addPersonnalData());
        observer.complete();
      })
  }

  getOffices(): Observable<Office[]> {
    if (!this.officeStore) {
      this.officeStore = this._http.get('../../assets/data/offices.json')
        .map((res: Response) => res.json());
    }
    return this.officeStore;
  }

  getStateProvinces(): Observable<any[]> {
    if (!this.stateProvinceStore) {
      this.stateProvinceStore = this._http.get('../../assets/data/statesProvinces.json')
        .map((res: Response) => res.json());
    }
    return this.stateProvinceStore;
  }

  updatePersonnel(data: Person) {
    //next for when click on update
    this.updatePersonalListSubject.next(data);
    this.personnelStore.forEach((entry) => {
      const dataIndex = entry.findIndex((e1 => e1.id === data.id));
      entry[dataIndex] = data;
    });
  }

  updateOffice(data: Office) {
    this.officeStore.forEach((entry) => {
      const dataIndex = entry.findIndex((e1 => e1.id === data.id));
      entry[dataIndex] = data;
    });
  }

//use for get updated value of personal list on route change
  getUpdatePersonalList(data) {
    this.personnelStore = data;
  }

  getUpdatedOfficeList(data) {
    this.officeStore = data;
  }



}
