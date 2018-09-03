import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetFactoryComponent } from './widget-factory.component';

describe('WidgetFactoryComponent', () => {
  let component: WidgetFactoryComponent;
  let fixture: ComponentFixture<WidgetFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
