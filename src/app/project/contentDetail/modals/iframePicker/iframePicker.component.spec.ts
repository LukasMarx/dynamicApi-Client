/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IframePickerComponent } from './iframePicker.component';

describe('IframePickerComponent', () => {
  let component: IframePickerComponent;
  let fixture: ComponentFixture<IframePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
