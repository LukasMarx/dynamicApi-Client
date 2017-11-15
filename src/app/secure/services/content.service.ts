import { map } from 'rxjs/operators';
import { SchemaService } from './schema.service';
import { Injectable } from '@angular/core';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ContentService {
  constructor(private schemaService: SchemaService, private apollo: Apollo) {
    this.schemaService.getAllTypes().subscribe(types => {
      this.types = {};
      console.log(types);
      for (let type of types) {
        this.types[type.name] = type;
      }
    });
  }

  types;

  getAll(typeName: string) {
    console.log(this.types, typeName);
    if (this.types) {
      const type = this.types[typeName];
      if (type) {
        let query = 'query Root {\n' + type.name + 's {\n';
        for (let field of type.fields) {
          query += field.name + '\n';
        }
        query += '}\n}';
        console.log(query);

        console.log(gql(query));

        return this.apollo.watchQuery(gql(query)).valueChanges.pipe(map(x => x.data[type.name]));
      }
    } else {
      return Observable.of([]);
    }
  }
}
