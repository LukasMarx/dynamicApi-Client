import { Widget } from "./widget";

export interface Page{
    id: string;
    gridWith: number;
    gridHeight: number;
    tab: string;
    widgets: Widget[];
}





