import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Person } from '../models/person';
import { Office } from '../models/office';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {

  personnelStore: Observable<Person[]>;
  officeStore: Observable<Office[]>;
  stateProvinceStore: Observable<any[]>;

  constructor(private _http: Http) { }

  getPersonnel(): Observable<Person[]> {
    if (!this.personnelStore) {
      this.personnelStore = this._http.get('../../assets/data/personnel.json')
        .map((res: Response) => res.json());
    }
    return this.personnelStore;
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

  updatePersonnel(data: Person): Observable<Person[]> {
    const result: Array<any> = [];
    this.personnelStore.forEach((entry) => {
      const dataIndex = entry.findIndex((e1 => e1.id === data.id));
      if (dataIndex > -1) {
        entry[dataIndex] = data;
      } else {
        const newIndex = entry.length + 1;
        data.id = newIndex;
        entry[entry.length] = data;
      }
      entry.map((dataLsit: Person) => {result.push(dataLsit); });
    });
    this.personnelStore = Observable.of(result);
    return this.personnelStore;
  }

updateOffice(data: Office) {
    const result: Array<any> = [];
    this.officeStore.forEach((entry) => {
      const dataIndex = entry.findIndex((e1 => e1.id === data.id));
      if (dataIndex > -1) {
        entry[dataIndex] = data;
      }else {
        data.id = entry.length + 1;
        entry[entry.length] = data;
      }

      entry.map((dataList: Office) => {result.push(dataList); });
      this.officeStore = Observable.of(result);
      return this.officeStore;
    });
  }



}
