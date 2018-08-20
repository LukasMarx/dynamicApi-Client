import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../services/content.service';
import { ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { Type } from '../../models/type';
import { Observable } from 'apollo-client/util/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

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
  workingCopy = {};

  groups = [];

  externalTypes: { [fieldName: string]: Type } = {};
  externalTypeContent = {};

  nodes;

  id;

  ngOnInit() {
    combineLatest(this.route.parent.parent.params, this.route.params).subscribe(([parent, child]) => {
      this.projectId = <string>parent['id'];
      const name = <string>child['type'];
      this.id = <string>child['id'];
      if (!this.projectId || !name) return;
      this.schemaService.getType(this.projectId, name).subscribe(type => {
        this.type = type;
        this.externalTypes = this.getExternalTypes(type, this.projectId);
        this.externalTypeContent = this.getExternalTypeContent(type, this.projectId);
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
      this.contentService.getById(this.projectId, name, this.id).subscribe(result => {
        const clone = JSON.parse(JSON.stringify(result));
        for (let key in this.type.fields) {
          let field = this.type.fields[key];
          if (field.type === 'BIG_TEXT') {
            clone[field.name] = JSON.parse(clone[field.name]);
          }
          if (this.contentService.isFieldCustomTyped(field) && !clone[field.name]) {
            clone[field.name] = {};
          }
        }

        this.workingCopy = JSON.parse(JSON.stringify(clone));
        console.log(this.workingCopy)
        this.content = clone;
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

  private getExternalTypes(type: Type, projectId: string) {
    const result = {};
    for (let key in type.fields) {
      if (this.contentService.isFieldCustomTyped(type.fields[key])) {
        result[key] = this.schemaService.getType(projectId, type.fields[key].type);
      }
    }
    return result;
  }

  private getExternalTypeContent(type: Type, projectId: string) {
    const result = {};
    for (let key in type.fields) {
      if (this.contentService.isFieldCustomTyped(type.fields[key])) {
        result[key] = this.contentService.getAll(type.fields[key].type, projectId).pipe(
          map(content => {
            const edges = (<any>content).edges;
            if (edges) {
              return edges.map(edge => {
                return edge.node;
              });
            }
          })
        );
      }
    }
    return result;
  }

  onSaveContent() {
    const clone = JSON.parse(JSON.stringify(this.workingCopy));
    for (let key in this.type.fields) {
      let field = this.type.fields[key];
      if (field.type === 'BIG_TEXT') {
        clone[field.name] = JSON.stringify(clone[field.name]);
      }
      if (this.contentService.isFieldCustomTyped(field) && !clone[field.name].id) {
        delete clone[this.type.fields[key].name];
      }
      if (this.contentService.isFieldCustomTyped(field) && clone[field.name] && clone[field.name].id) {
        clone[field.name] = { id: clone[field.name].id };
      }
      if (this.contentService.isFieldCustomTyped(field) && field.list) {
        let added = [];
        let removed = [];
        if (this.workingCopy[field.name] && this.workingCopy[field.name].filter) {
          added = this.workingCopy[field.name].filter(o => !this.content[field.name].edges.find(o2 => o.id === o2.node.id)).map(x => x.id);
        }
        if (this.content[field.name].edges && this.workingCopy[field.name].find) {
          removed = this.content[field.name].edges.filter(o => !this.workingCopy[field.name].find(o2 => o.node.id === o2.id)).map(x => x.node.id);
        }
        console.log(removed);
        if (added.length > 0) {
          this.contentService
            .assign(
              this.projectId,
              this.type.name,
              field.name,
              added.map(x => {
                return { parent: this.id, child: x };
              })
            )
            .subscribe();
        }
        if (removed.length > 0) {
          this.contentService
            .deassign(
              this.projectId,
              this.type.name,
              field.name,
              removed.map(x => {
                return { parent: this.id, child: x };
              })
            )
            .subscribe();
        }
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

  connectionToNodes(connection) {
    if (connection) {
      if (connection.edges) {
        const result = connection.edges.map(x => x.node);
        return JSON.parse(JSON.stringify(result));
      } else return connection;
    }
  }

  onReleaseContent() {
    const clone = JSON.parse(JSON.stringify(this.workingCopy));
    clone.public = true;
    this.workingCopy = clone;
    this.onSaveContent();
  }

  onEditorDeltaChanged(fieldName, delta) {
    this.workingCopy[fieldName] = delta;
  }
}
