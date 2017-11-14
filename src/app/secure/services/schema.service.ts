import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

const getAllTyesQuery = gql`
  query Root {
    types {
      name
      fields {
        name
        type
      }
    }
  }
`;

const getTypeQuery = gql`
  query Root($name: String!) {
    type(name: $name) {
      name
      fields {
        name
        type
      }
    }
  }
`;

const addFieldToTypeQuery = gql`
  mutation MutationType($typeName: String!, $field: FieldInput!) {
    addField(type: $typeName, input: $field) {
      name
      type
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
      .valueChanges.pipe(map(x => x.data['types']));
  }

  getType(name: string) {
    return this.apollo
      .watchQuery({ query: getTypeQuery, variables: { name: name } })
      .valueChanges.pipe(map(x => x.data['type']));
  }

  addFieldToType(typeName: string, field: any) {
    return this.apollo.mutate({
      mutation: addFieldToTypeQuery,
      variables: { typeName: typeName, field: field },
      update: (store, { data: { addField } }) => {
        const data = store.readQuery({ query: getTypeQuery, variables: { name: typeName } });
        console.log(data);
        (<any>data).type.fields.push(addField);
        store.writeQuery({ query: getTypeQuery, data, variables: { name: typeName } });
      }
    });
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

        (<any>data).types.push(createType);
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
            type
          }
        }
      `,
      variables: { name: name }
    });
  }
}
