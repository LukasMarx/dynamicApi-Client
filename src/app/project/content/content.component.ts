import { ContentService } from './../services/content.service';
import { SchemaService } from './../services/schema.service';
import { Component, OnInit, group } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Type } from '../../models/type';
import 'rxjs/add/observable/merge';
import { map, flatMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { environment } from '../../../environments/environment';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements AfterViewInit {
  private subscriptions: Subscription[] = [];
  public type: Type;
  public projectId: string;

  public assetUrl = environment.assetUrl;

  constructor(private schemaService: SchemaService, private route: ActivatedRoute, private contentService: ContentService, private router: Router) {}

  ngAfterViewInit() {
    combineLatest(this.route.parent.parent.params, this.route.params).subscribe(([parent, child]) => {
      this.projectId = <string>parent['id'];
      const typeName = <string>child['name'];
      this.schemaService.getType(this.projectId, typeName).subscribe(result => {
        this.type = result;
      });
    });
  }

  onAddContent() {
    this.contentService.create(this.projectId, this.type.name).subscribe();
  }

  onRowClicked(row: any) {
    this.router.navigate([`./project/${this.projectId}/content/detail/${this.type.name}/${row.node.id}`]);
  }
}
