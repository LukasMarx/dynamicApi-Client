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

  getAllQueries = {};
  getByIdQueries = {};

  getAll(typeName: string, projectId: string) {
    return Observable.create(observer => {
      this.schemaService.getType(projectId, typeName).subscribe(type => {
        if (type) {
          let query = 'query ($projectId: String!){' + type.name + 's (projectId: $projectId){';
          query += 'id\n';
          for (let fieldKey in type.fields) {
            query += type.fields[fieldKey].name + '\n';
          }
          query += '}}';

          this.getAllQueries[typeName] = gql([query]);
          this.apollo
            .use('content')
            .watchQuery({
              query: gql([query]),
              variables: { projectId: projectId }
            })
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
      });
    });
  }

  updateById(projectId: string, typeName: string, input: any) {
    return Observable.create(observer => {
      this.schemaService.getType(projectId, typeName).subscribe(type => {
        if (type) {
          let mutation =
            'mutation($projectId: String!, $input: ' +
            type.name +
            'Input!) { update' +
            type.name +
            '(projectId: $projectId, input: $input ) {';
          for (let fieldKey in type.fields) {
            mutation += type.fields[fieldKey].name + '\n';
          }
          mutation += '}}';
          console.log(mutation);

          console.log(gql([mutation]));

          this.apollo
            .use('content')
            .mutate(<any>{
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

              variables: { projectId: projectId, input: input },

              refetchQueries: [
                {
                  query: this.getByIdQueries[type.name + input.Id],
                  variables: { projectId: projectId, id: input.Id }
                }
              ]
            })
            .pipe(map(x => x.data['create' + type.name]))
            .subscribe(value => {
              observer.next(value);
            });
        }
      });
    });
  }

  getById(projectId: string, typeName: string, id: string) {
    return Observable.create(observer => {
      this.schemaService.getType(projectId, typeName).subscribe(type => {
        // for (let type of types) {
        //   types[type.name] = type;
        // }
        if (type) {
          let query =
            'query ($projectId: String!, $id: String!){' +
            type.name +
            '(projectId: $projectId, id: $id) {';
          query += 'id\n';
          for (let fieldKey in type.fields) {
            query += type.fields[fieldKey].name + '\n';
          }
          query += '}}';

          this.getByIdQueries[typeName + id] = gql([query]);
          this.apollo
            .use('content')
            .watchQuery({
              query: gql([query]),
              variables: { projectId: projectId, id: id }
            })
            .valueChanges.pipe(
              map(x => {
                return x.data[type.name];
              })
            )
            .subscribe(value => {
              observer.next(value);
            });
        }
      });
    });
  }

  create(projectId: string, typeName: string) {
    return Observable.create(observer => {
      this.schemaService.getType(projectId, typeName).subscribe(type => {
        // for (let type of types) {
        //   types[type.name] = type;
        // }
        if (type) {
          let mutation =
            'mutation RootMutation($projectId: String!){ create' +
            type.name +
            '(projectId: $projectId ,input:  {} ) {';
          for (let fieldKey in type.fields) {
            mutation += type.fields[fieldKey].name + '\n';
          }
          mutation += '}}';

          this.apollo
            .use('content')
            .mutate(<any>{
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
              variables: { projectId: projectId },
              context: { uri: 'http://localhost:8000/' + projectId + '/api' },
              refetchQueries: [
                { query: this.getAllQueries[type.name], variables: { projectId: projectId } }
              ]
            })
            .pipe(map(x => x.data['create' + type.name]))
            .subscribe(value => {
              observer.next(value);
            });
        }
      });
    });
  }
}