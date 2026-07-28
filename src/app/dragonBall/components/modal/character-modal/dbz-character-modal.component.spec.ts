/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DbzCharacterModalComponent } from './dbz-character-modal.component';

describe('CharacterModalComponent', () => {
  let component: DbzCharacterModalComponent;
  let fixture: ComponentFixture<DbzCharacterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbzCharacterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbzCharacterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
