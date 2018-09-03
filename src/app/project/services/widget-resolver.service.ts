import { Injectable, Type } from '@angular/core';
import { EditorComponent } from '../contentDetail/editor';
import { WidgetComponent } from '../../models/widget-component';

@Injectable()
export class WidgetResolverService {

  constructor() { }

  resolve(component: string): Type<WidgetComponent>{
    switch(component){
      case "0-0":
        return EditorComponent;
    }
  }
}
