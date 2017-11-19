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
        displayGroup
        fullPage
      }
    }
  }
`;

const addFieldToTypeQuery = gql`
  mutation MutationType($typeName: String!, $field: FieldInput!) {
    addField(type: $typeName, field: $field) {
      name
      type
      displayGroup
      fullPage
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

  removeFieldFromType(typeName: string, name: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation MutationType($type: String!, $name: String!) {
          removeField(type: $type, name: $name)
        }
      `,
      variables: { type: typeName, name: name },
      update: (store, { data: { removeField } }) => {
        const data = store.readQuery({ query: getTypeQuery, variables: { name: typeName } });
        if ((<any>data).type.fields)
          (<any>data).type.fields = (<any>data).type.fields.filter(x => x.name != removeField);
        store.writeQuery({ query: getTypeQuery, variables: { name: typeName }, data });
      }
    });
  }

  removeType(name: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation MutationType($name: String!) {
          removeType(name: $name)
        }
      `,
      variables: { name: name },
      update: (store, { data: { removeType } }) => {
        const data = store.readQuery({ query: getAllTyesQuery });
        if ((<any>data).types)
          (<any>data).types = (<any>data).types.filter(x => x.name != removeType);
        store.writeQuery({ query: getAllTyesQuery, data });
      }
    });
  }
}
