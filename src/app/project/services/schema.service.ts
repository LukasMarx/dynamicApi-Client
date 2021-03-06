import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Type } from '../../models/type';
import { Observable } from 'rxjs/Observable';

const getAllTyesQuery = gql`
  query Root($projectId: String!) {
    types(projectId: $projectId) {
      name
      fields {
        name
        visibility
        list
      }
    }
  }
`;

const getTypeQuery = gql`
  query Root($projectId: String!, $name: String!) {
    type(projectId: $projectId, name: $name) {
      name
      requiresPublication
      fields {
        name
        type
        displayGroup
        fullPage
        visibility
        list
      }
      permissions {
        read
        readAll
        update
        create
        delete
        role
      }
    }
  }
`;

@Injectable()
export class SchemaService {
  constructor(private apollo: Apollo) {}

  getAllTypes(projectId: string) {
    return this.apollo
      .watchQuery({
        query: getAllTyesQuery,
        variables: { projectId: projectId }
      })
      .valueChanges.pipe(
        map(x => {
          return x.data['types'].map(type => {
            const output = JSON.parse(JSON.stringify(type));
            output.permissions = {};
            if (type.permissions) {
              for (let per of type.permissions) {
                output.permissions[per.role] = per;
              }
            }
            return output;
          });
        })
      );
  }

  getType(projectId: string, name: string): Observable<Type> {
    return this.apollo
      .watchQuery({
        query: getTypeQuery,
        variables: { projectId: projectId, name: name }
      })
      .valueChanges.pipe<Type>(
        map(x => {
          const input = x.data['type'];
          const output = JSON.parse(JSON.stringify(input));

          output.fields = {};
          if (input.fields) {
            for (let field of input.fields) {
              output.fields[field.name] = field;
            }
          }

          output.permissions = {};
          if (input.permissions) {
            for (let per of input.permissions) {
              output.permissions[per.role] = per;
            }
          }
          return output;
        })
      );
  }

  addType(projectId: string, name: string) {
    const type = new Type();
    type.projectId = projectId;
    type.name = name;
    return this.apollo.mutate({
      mutation: gql`
        mutation MutationType($projectId: String!, $type: TypeInput!) {
          createType(projectId: $projectId, type: $type) {
            name
            fields {
              name
              type
              visibility
              list
            }
          }
        }
      `,
      variables: { projectId: projectId, type: type },
      update: (store, { data: { createType } }) => {
        const data = store.readQuery({
          query: getAllTyesQuery,
          variables: { projectId: projectId }
        });
        (<any>data).types.push(createType);
        store.writeQuery({
          query: getAllTyesQuery,
          variables: { projectId: projectId },
          data
        });
      }
    });
  }

  updateType(projectId: string, name: string, type: Type) {
    const output = JSON.parse(JSON.stringify(type));
    output.permissions = [];
    for (let key in type.permissions) {
      output.permissions.push(type.permissions[key]);
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation MutationType($projectId: String!, $name: String!, $type: TypeInput!) {
          updateType(projectId: $projectId, name: $name, type: $type) {
            name
            requiresPublication
            fields {
              name
              type
              fullPage
              displayGroup
              visibility
              list
            }
          }
        }
      `,
      variables: { projectId: projectId, name: name, type: output },
      update: (store, { data: { updateType } }) => {
        // let data = store.readQuery({
        //   query: getAllTyesQuery,
        //   variables: { projectId: projectId }
        // });
        // if ((<any>data).types)
        //   (<any>data).types.forEach(type => {
        //     if (type.name == updateType.name) {
        //       type = updateType;
        //     }
        //   });

        // store.writeQuery({ query: getAllTyesQuery, variables: { projectId: projectId }, data });

        let data = store.readQuery({
          query: getTypeQuery,
          variables: { projectId: projectId, name: updateType.name }
        });
        console.log(updateType);
        (<any>data).type = updateType;
        store.writeQuery({
          query: getTypeQuery,
          variables: { projectId: projectId, name: updateType.name },
          data
        });
      }
    });
  }

  removeType(projectId: string, name: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation MutationType($projectId: String!, $name: String!) {
          removeType(projectId: $projectId, name: $name)
        }
      `,
      variables: { projectId: projectId, name: name },
      update: (store, { data: { removeType } }) => {
        const data = store.readQuery({
          query: getAllTyesQuery,
          variables: { projectId: projectId }
        });
        if ((<any>data).types) (<any>data).types = (<any>data).types.filter(x => x.name != removeType);
        store.writeQuery({
          query: getAllTyesQuery,
          variables: { projectId: projectId },
          data
        });
      }
    });
  }
}
