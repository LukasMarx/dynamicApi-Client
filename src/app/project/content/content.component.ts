import { ContentService } from './../services/content.service';
import { SchemaService } from './../services/schema.service';
import { Component, OnInit, group } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Type } from '../../models/type';
import 'rxjs/add/observable/merge';
import { map, flatMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements AfterViewInit {
  private subscriptions: Subscription[] = [];
  public type: Type;
  displayedColumns = [];

  public dataSource: UniversalDataSource;

  public data = {
    type: null,
    projectId: null
  };

  private typeChanged$: Subject<Type>;
  private projectIdChanged$: Subject<string>;

  constructor(
    private schemaService: SchemaService,
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {
    this.projectIdChanged$ = new Subject<string>();
    this.typeChanged$ = new Subject<Type>();
    if (!this.dataSource) {
      this.dataSource = new UniversalDataSource(
        this.contentService,
        this.typeChanged$,
        this.projectIdChanged$,
        this.data
      );
    }
    //this.dataSource.connect();
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.route.parent.parent.params.subscribe(params => {
        this.data.projectId = <string>params['id'];
        // this.projectIdChanged$.next(this.data.projectId);
        this.route.params.subscribe(params => {
          const name = <string>params['name'];
          this.schemaService.getType(this.data.projectId, name).subscribe(result => {
            this.data.type = result;

            this.displayedColumns = [];
            for (let key in this.data.type.fields) {
              const field = this.data.type.fields[key];
              if (field.type !== 'BIG_TEXT') {
                this.displayedColumns.push(field.name);
              }
            }
            this.typeChanged$.next(result);
          });
        });
      })
    );
  }

  onAddContent() {
    this.contentService.create(this.data.projectId, this.data.type.name).subscribe();
  }
}

export class UniversalDataSource extends DataSource<any> {
  constructor(
    private contentService: ContentService,
    private typeChanged$: Observable<Type>,
    private projectIdChanged$: Observable<string>,
    private data: any
  ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    const dataChanges = [this.typeChanged$, this.projectIdChanged$];
    return Observable.merge(...dataChanges).pipe(
      flatMap(() => {
        if (this.data.type && this.data.projectId) {
          const result = this.contentService.getAll(this.data.type.name, this.data.projectId);
          return result;
        }
      })
    );
  }

  disconnect() {}
}
