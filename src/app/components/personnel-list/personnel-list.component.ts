import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CommonService } from '../../service/common-service.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.css']
})
export class PersonnelListComponent implements OnInit {
  personnelList: Observable<Person[]>;
  newPersonList = [];

  constructor(private _commonService: CommonService) { }

  ngOnInit() {
  	//get value when click on update of personal
  	this._commonService.updatePersonalListSubject.subscribe((data) => {
  		const index = this.newPersonList.findIndex(e => e.id === data['id']);
  		this.newPersonList[index] = data;
  		if(data['active']) {
    			this.newPersonList.splice(index, 1);
    	}
      this._commonService.getUpdatePersonalList(Observable.of(this.newPersonList));
  	})
    this.personnelList = this._commonService.getPersonnel();
    //get list on load
    this.personnelList.subscribe(data=> 
    	{
    		this.newPersonList = data;
    	});
  }
  addNew() {
  	//call when click on add button
  this._commonService.addNewPersonnalList().subscribe(data => {
  	data['active'] = true;
  	this.newPersonList.unshift(data);
  })
  }

}
