import { MatPaginator } from "@angular/material";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Type } from "../../models/type";
import { ContentService } from "../services/content.service";
import { combineLatest } from "rxjs/observable/combineLatest";
import { withLatestFrom } from "rxjs/operators";

export class UniversalDataSource extends DataSource<any> {
    data;
  
    paginator: MatPaginator;
  
    private readonly _renderData = new BehaviorSubject<any[]>([]);
  
    constructor(private contentService: ContentService, private typeChanged$: Observable<Type>, private projectIdChanged$: Observable<string>) {
      super();
      this._renderData = new BehaviorSubject<any[]>([]);
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
      combineLatest(this.typeChanged$, this.projectIdChanged$).subscribe(([type, projectId]) => {
        if (projectId && type) {
          this.contentService.getAll(type.name, projectId, this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize).subscribe(data => {
            this.paginator.length = data.totalCount;
            this._renderData.next(data.edges);
          });
        }
      });
  
      this.paginator.page.pipe(withLatestFrom(this.typeChanged$, this.projectIdChanged$)).subscribe(([page, type, projectId]) => {
        if (projectId && type) {
          this.contentService.getAll(type.name, projectId, this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize).subscribe(data => {
            this.paginator.length = data.totalCount;
            this._renderData.next(data.edges);
          });
        }
      });
  
      return this._renderData.asObservable();
    }
  
    disconnect() {}
  }