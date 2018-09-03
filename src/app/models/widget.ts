import { WidgetComponent } from "./widget-component";
import { Type } from "@angular/core";

export interface Widget{
    top: number;
    left: number;
    width: number;
    height: number;
    component: string;
    configuration: string;
}