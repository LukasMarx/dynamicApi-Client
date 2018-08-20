import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContentService } from '../../services/content.service';
import { Observable } from 'rxjs/Observable';
import { Type } from '../../../models/type';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { SelectionModel } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dynamicTable',
  templateUrl: './dynamicTable.component.html',
  styleUrls: ['./dynamicTable.component.css']
})
export class DynamicTableComponent implements OnInit, OnChanges {
  @Input() type: Type;
  @Input() projectId: string;
  @Input() assetUrl: string = '';

  @Input() select: boolean;
  @Input() initialSelection = [];

  @Output() rowClick = new EventEmitter<any>();

  @Output() selected = new EventEmitter<any[]>();

  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns = [];

  private typeChanged: ReplaySubject<Type>;
  private projectIdChanged: ReplaySubject<string>;

  public dataSource: UniversalDataSource;

  allowMultiSelect = true;
  selection: SelectionModel<any>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type && changes.type.currentValue) {
      this.typeChanged.next(changes.type.currentValue);
    }
    if (changes.projectId && changes.projectId.currentValue) {
      this.projectIdChanged.next(changes.projectId.currentValue);
    }
    if (changes.initialSelection) {
      this.selection = new SelectionModel<any>(this.allowMultiSelect, changes.initialSelection.currentValue);
    }
    this.displayedColumns = [];
    if (this.select) {
      this.displayedColumns.push('select');
    }
    if (this.type) {
      for (let key in this.type.fields) {
        const field = this.type.fields[key];
        if (field.type !== 'BIG_TEXT') {
          this.displayedColumns.push(field.name);
        }
      }
    }
  }

  constructor(private contentService: ContentService) {
    this.projectIdChanged = new ReplaySubject<string>();
    this.typeChanged = new ReplaySubject<Type>();
    this.assetUrl = environment.assetUrl;
  }

  ngOnInit() {
    
    this.selection = new SelectionModel<string>(this.allowMultiSelect, this.initialSelection);
    if (!this.dataSource) {
      this.dataSource = new UniversalDataSource(this.contentService, this.typeChanged.asObservable(), this.projectIdChanged.asObservable());
      this.dataSource.paginator = this.paginator;
    }
  }

  checkBoxChange(event, row) {
    if (event && !event.checked) {
      for (let selected of this.selection.selected) {
        if (row.node.id === selected.id) {
          this.selection.deselect(selected);
          break;
        }
      }
    } else {
      this.selection.select(row.node);
    }
    console.log(this.selection.selected);
    this.selected.emit(this.selection.selected);
  }

  isRowSelected(row) {
    for (let selected of this.selection.selected) {
      if (row.node.id === selected.id){ 
        return true;
      }
    }
    return false;
  }
}

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
