/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DbzCharacterByRacePageComponent } from './dbz-character-by-race-page.component';

describe('DbzCharacterByPageComponent', () => {
  let component: DbzCharacterByRacePageComponent;
  let fixture: ComponentFixture<DbzCharacterByRacePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbzCharacterByRacePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbzCharacterByRacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
