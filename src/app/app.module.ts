import { environment } from './../environments/environment';
import { AccountService } from './services/account.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { HttpHeaders } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectService } from './services/project.service';
import { setContext } from 'apollo-link-context';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FlexLayoutModule
  ],
  providers: [AccountService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const http = httpLink.create({
      uri: environment.baseUrl + '/admin/api'
    });
    const http2 = httpLink.create({
      uri: environment.baseUrl + '/admin/content'
    });

    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
        };
      }
    });

    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache()
    });

    apollo.create(
      {
        link: auth.concat(http2),
        cache: new InMemoryCache()
      },
      'content'
    );
  }
}
