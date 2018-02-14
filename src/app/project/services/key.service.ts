import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

const getKeyQuery = gql`
  query Root($projectId: String!) {
    authKey(projectId: $projectId)
  }
`;

@Injectable()
export class KeyService {
  constructor(private apollo: Apollo) {}

  getKey(projectId: string) {
    return this.apollo
      .query({ query: getKeyQuery, variables: { projectId: projectId } })
      .pipe(map(data => data.data['authKey']));
  }
}
