/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LangPickerComponent } from './langPicker.component';

describe('LangPickerComponent', () => {
  let component: LangPickerComponent;
  let fixture: ComponentFixture<LangPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
