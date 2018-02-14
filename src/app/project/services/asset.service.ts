import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import gql from 'graphql-tag';
import { Asset } from '../../models/asset';

const getAllAssetsQuery = gql`
  query Root($projectId: String!) {
    assets(projectId: $projectId) {
      fileName
      type
      size
    }
  }
`;

@Injectable()
export class AssetService {
  url = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private apollo: Apollo
  ) {}

  public insert(projectId: string, files: Set<File>) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const formData: FormData = new FormData();
    let i = 0;
    files.forEach(file => {
      formData.append(i.toString(), file, file.name);
      i++;
    });

    return this.http.post(`${this.url}/${projectId}/asset`, formData, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
  }

  public getAll(projectId: string): Observable<Asset[]> {
    return this.apollo
      .watchQuery({ query: getAllAssetsQuery, variables: { projectId: projectId } })
      .valueChanges.pipe(
        map(x => {
          return <Asset[]>x.data['assets'];
        })
      );
  }
}
