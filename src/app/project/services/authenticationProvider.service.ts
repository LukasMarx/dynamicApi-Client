import { Injectable } from '@angular/core';
import { AuthenticationProvider } from '../../models/authenticationProvider';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

const getAllProvidersQuery = gql`
  query Root($projectId: String!) {
    authenticationProviders(projectId: $projectId) {
      id
      name
      mappings {
        userId
        cloudProvider
        name
        pictureUrl
      }
      cloudProvider
      projectId
    }
  }
`;

const createProviderMutation = gql`
  mutation RootMutation(
    $projectId: String!
    $authProvider: AuthenticationProviderInput!
  ) {
    createAuthenticationProvider(
      projectId: $projectId
      authProvider: $authProvider
    ) {
      id
      name
      mappings {
        userId
        cloudProvider
        name
        pictureUrl
      }
      cloudProvider
      projectId
    }
  }
`;

@Injectable()
export class AuthenticationProviderService {
  constructor(private apollo: Apollo) {}

  public getAll(projectId: string) {
    return this.apollo
      .watchQuery({
        query: getAllProvidersQuery,
        variables: { projectId: projectId }
      })
      .valueChanges.pipe(
        map(x => {
          return <AuthenticationProvider[]>x.data['authenticationProviders'];
        })
      );
  }

  public addAuthenticationProvider(
    projectId: string,
    authProvider: AuthenticationProvider
  ) {
    return this.apollo.mutate({
      mutation: createProviderMutation,
      variables: { projectId: projectId, authProvider: authProvider },
      update: (store, { data: { createAuthenticationProvider } }) => {
        const data = store.readQuery({
          query: getAllProvidersQuery,
          variables: { projectId: projectId }
        });
        (<any>data).authenticationProviders.push(createAuthenticationProvider);
        store.writeQuery({
          query: getAllProvidersQuery,
          variables: { projectId: projectId },
          data
        });
      }
    });
  }
}
