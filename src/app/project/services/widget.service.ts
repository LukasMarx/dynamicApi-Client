import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Page } from '../../models/page';

const getAllPagesQuery = gql`
  query Root($projectId: String!, $type: String!) {
    pages(projectId: $projectId, type: $type) {
      id
      tab
      widgets {
        top
        left
        width
        height
        component
      }
     
    }
  }
`;

@Injectable()
export class WidgetService {

  constructor(private apollo: Apollo) { }

  getAll(projectId: string, type:string){
    return this.apollo.watchQuery({ 
      query: getAllPagesQuery,
      variables: { projectId, type }
     }).valueChanges.pipe(
      map(x => {
        return <Page[]>x.data['pages'];
      })
    );
  }

}
