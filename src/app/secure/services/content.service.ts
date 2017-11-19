import { map } from 'rxjs/operators';
import { SchemaService } from './schema.service';
import { Injectable } from '@angular/core';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ContentService {
  constructor(private schemaService: SchemaService, private apollo: Apollo) {}

  types;

  getAllQueries = {};

  getAll(typeName: string) {
    return Observable.create(observer => {
      this.schemaService.getAllTypes().subscribe(types => {
        this.types = {};
        for (let type of types) {
          this.types[type.name] = type;
        }
        if (this.types) {
          console.log(this.types);
          const type = this.types[typeName];
          if (type) {
            let query = '{' + type.name + 's {';
            query += 'Id\n';
            for (let field of type.fields) {
              query += field.name + '\n';
            }
            query += '}}';

            this.getAllQueries[typeName] = gql([query]);
            this.apollo
              .use('content')
              .watchQuery({ query: gql([query]) })
              .valueChanges.pipe(
                map(x => {
                  return x.data[type.name + 's'];
                })
              )
              .subscribe(value => {
                console.log(value);
                observer.next(value);
              });
          }
        }
      });
    });
  }

  create(typeName: string) {
    return Observable.create(observer => {
      this.schemaService.getAllTypes().subscribe(types => {
        this.types = {};
        for (let type of types) {
          this.types[type.name] = type;
        }
        if (this.types) {
          const type = this.types[typeName];
          if (type) {
            let mutation = 'mutation { create' + type.name + '(input:  {} ) {';
            for (let field of type.fields) {
              mutation += field.name + '\n';
            }
            mutation += '}}';
            console.log(mutation);

            console.log(gql([mutation]));

            this.apollo
              .use('content')
              .mutate({
                mutation: gql([mutation]),
                // update: (store, { data }) => {
                //   const d = store.readQuery({ query: this.getAllQueries[typeName] });
                //   console.log(data);
                //   (<any>d)[typeName + 's'].push(data['create' + type.name]);
                //   store.writeQuery(<any>{
                //     query: this.getAllQueries[typeName],
                //     d
                //   });
                // }
                refetchQueries: [{ query: this.getAllQueries[type.name] }]
              })
              .pipe(map(x => x.data['create' + type.name]))
              .subscribe(value => {
                observer.next(value);
              });
          }
        }
      });
    });
  }
}
