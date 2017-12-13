import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelCardComponent } from './personnel-card.component';

describe('PersonnelCardComponent', () => {
  let component: PersonnelCardComponent;
  let fixture: ComponentFixture<PersonnelCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
