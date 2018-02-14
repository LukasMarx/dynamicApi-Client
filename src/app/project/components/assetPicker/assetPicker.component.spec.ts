/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AssetPickerComponent } from './assetPicker.component';

describe('AssetPickerComponent', () => {
  let component: AssetPickerComponent;
  let fixture: ComponentFixture<AssetPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
