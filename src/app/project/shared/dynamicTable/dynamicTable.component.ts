import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContentService } from '../../services/content.service';
import { Type } from '../../../models/type';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from '../../../../environments/environment';
import { UniversalDataSource } from '../universalDataSource';

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


