import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../services/content.service';
import { ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { Type } from '../../models/type';

@Component({
  selector: 'app-contentDetail',
  templateUrl: './contentDetail.component.html',
  styleUrls: ['./contentDetail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentDetailComponent implements OnInit {
  projectId: string;
  constructor(
    private schemaService: SchemaService,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationsService
  ) {}

  type;

  content = {};

  groups = [];

  externalTypeContent = {};

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = <string>params['id'];
      this.route.params.subscribe(params => {
        const name = <string>params['type'];
        this.schemaService.getType(this.projectId, name).subscribe(type => {
          this.type = type;
          this.externalTypeContent = this.getExternalContent(type, this.projectId);
          const groups = this.orderFieldsByGroup(this.type.fields);
          for (let key in groups.fullpage) {
            this.groups.push({
              name: key,
              fields: groups.fullpage[key],
              fullPage: true
            });
          }
          for (let key in groups.default) {
            if (key === '_') continue;
            this.groups.push({
              name: key,
              fields: groups.fullpage[key]
            });
          }

          this.groups.push({
            name: 'Default',
            fields: groups.default['_']
          });
        });
        this.contentService.getById(this.projectId, <string>params['type'], <string>params['id']).subscribe(result => {
          const clone = JSON.parse(JSON.stringify(result));
          for (let key in this.type.fields) {
            if (this.type.fields[key].type === 'BIG_TEXT') {
              clone[this.type.fields[key].name] = JSON.parse(clone[this.type.fields[key].name]);
            }
            if (this.contentService.isFieldCustomTyped(this.type.fields[key]) && !clone[this.type.fields[key].name]) {
              clone[this.type.fields[key].name] = {};
            }
          }

          delete clone.__typename;
          this.content = clone;
        });
      });
    });
  }

  private orderFieldsByGroup(fields: { [key: string]: any }) {
    let groups = { fullpage: {}, default: {} };
    for (let key in fields) {
      let field = fields[key];
      if (!field.displayGroup) {
        if (!groups.default['_']) groups.default['_'] = [];
        groups.default['_'].push(field);
      } else {
        if (field.fullPage) {
          if (!groups.fullpage[field.displayGroup]) groups.fullpage[field.displayGroup] = [];

          groups.fullpage[field.displayGroup].push(field);
        } else {
          if (!groups.default[field.displayGroup]) groups.default[field.displayGroup] = [];

          groups.default[field.displayGroup].push(field);
        }
      }
    }
    return groups;
  }

  private getExternalContent(type: Type, projectId: string) {
    const result = {};
    for (let key in type.fields) {
      if (this.contentService.isFieldCustomTyped(type.fields[key])) {
        result[key] = this.contentService.getAll(type.fields[key].type, projectId);
      }
    }
    return result;
  }

  onSaveContent() {
    const clone = JSON.parse(JSON.stringify(this.content));
    for (let key in this.type.fields) {
      if (this.type.fields[key].type === 'BIG_TEXT') {
        clone[this.type.fields[key].name] = JSON.parse(clone[this.type.fields[key].name]);
      }
      if (this.contentService.isFieldCustomTyped(this.type.fields[key]) && !clone[this.type.fields[key].name].id) {
        delete clone[this.type.fields[key].name];
      }
    }
    this.contentService.updateById(this.projectId, this.type.name, clone).subscribe(
      () => {
        const toast = this.notificationService.success(this.type.name + ' updated!', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      },
      () => {
        const toast = this.notificationService.error('Update failed', '', {
          timeOut: 4000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    );
  }

  onReleaseContent() {
    const clone = JSON.parse(JSON.stringify(this.content));
    clone.public = true;
    this.content = clone;
    console.log(this.content);
    this.onSaveContent();
  }

  onEditorDeltaChanged(fieldName, delta) {
    console.log(fieldName, delta);
    this.content[fieldName] = delta;
  }
}
