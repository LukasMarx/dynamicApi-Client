import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

const getAllProjectsQuery = gql`
  query {
    projects {
      name
      id
    }
  }
`;

const getProjectQuery = gql`
  query($id: String!) {
    project(id: $id) {
      name
      id
    }
  }
`;

const insertNewProjectMutation = gql`
  mutation($input: ProjectInput!) {
    createProject(input: $input) {
      name
    }
  }
`;

@Injectable()
export class ProjectService {
  constructor(private apollo: Apollo) {}

  public getAllProjects() {
    return this.apollo
      .watchQuery({ query: getAllProjectsQuery })
      .valueChanges.pipe(map(x => x.data['projects']));
  }

  public getProject(id: string) {
    return this.apollo
      .watchQuery({ query: getProjectQuery, variables: { id: id } })
      .valueChanges.pipe(map(x => x.data['projects']));
  }

  public addProject(project: any) {
    return this.apollo.mutate({
      mutation: insertNewProjectMutation,
      variables: { input: project }
    });
  }
}
