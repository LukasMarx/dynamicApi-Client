import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../services/content.service';
import { ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';

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
    private snackBar: MatSnackBar
  ) {}

  type;

  content = {};

  groups = [];

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = <string>params['id'];
      this.route.params.subscribe(params => {
        const name = <string>params['type'];
        this.schemaService.getType(this.projectId, name).subscribe(result => {
          this.type = result;
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
        this.contentService
          .getById(this.projectId, <string>params['type'], <string>params['id'])
          .subscribe(result => {
            const clone = JSON.parse(JSON.stringify(result));
            const bigTexts = this.type.fields.filter(x => x.type === 'BIG_TEXT');
            bigTexts.forEach(field => {
              clone[field.name] = JSON.parse(clone[field.name]);
            });
            delete clone.__typename;
            this.content = clone;
          });
      });
    });
  }

  private orderFieldsByGroup(fields: any[]) {
    let groups = { fullpage: {}, default: {} };
    for (let field of fields) {
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

  onSaveContent() {
    const clone = JSON.parse(JSON.stringify(this.content));
    const bigTexts = this.type.fields.filter(x => x.type === 'BIG_TEXT');
    bigTexts.forEach(field => {
      clone[field.name] = JSON.stringify(clone[field.name]);
    });
    this.contentService.updateById(this.projectId, this.type.name, clone).subscribe(
      () => {
        let snackBarRef = this.snackBar.open(this.type.name + ' saved successfully!', null, {
          duration: 2000
        });
      },
      () => {
        let snackBarRef = this.snackBar.open('Saving failed!', null, {
          duration: 4000
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
