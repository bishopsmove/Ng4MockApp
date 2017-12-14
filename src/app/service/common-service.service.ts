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

  updatePersonnel(data: Person) {
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



}
