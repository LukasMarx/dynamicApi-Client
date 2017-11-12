import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

const getAllTyesQuery = gql`
  {
    type {
      name
      fields {
        name
        type
      }
    }
  }
`;

@Injectable()
export class SchemaService {
  constructor(private apollo: Apollo) {}

  getAllTypes() {
    return this.apollo
      .watchQuery({
        query: getAllTyesQuery
      })
      .valueChanges.pipe(map(x => x.data['type']));
  }

  addType(name: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation MutationType($name: String!) {
          createType(name: $name) {
            name
            fields {
              name
              type
            }
          }
        }
      `,
      variables: { name: name },
      update: (store, { data: { createType } }) => {
        const data = store.readQuery({ query: getAllTyesQuery });
        (<any>data).type.push(createType);
        store.writeQuery({ query: getAllTyesQuery, data });
      }
    });
  }

  removeType(name: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation MutationType($name: String!) {
          removeType(name: $name) {
            name
          }
        }
      `,
      variables: { name: name }
    });
  }
}
