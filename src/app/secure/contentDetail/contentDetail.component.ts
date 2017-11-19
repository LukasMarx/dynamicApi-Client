import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../services/content.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contentDetail',
  templateUrl: './contentDetail.component.html',
  styleUrls: ['./contentDetail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentDetailComponent implements OnInit {
  constructor(
    private schemaService: SchemaService,
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {}

  type;

  groups = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = <string>params['type'];
      this.schemaService.getType(name).subscribe(result => {
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
}
