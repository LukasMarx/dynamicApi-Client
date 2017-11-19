import { ContentService } from './../services/content.service';
import { SchemaService } from './../services/schema.service';
import { Component, OnInit, group } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  displayedColumns = [];

  public dataSource: UniversalDataSource;

  public type;

  constructor(
    private schemaService: SchemaService,
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        const name = <string>params['name'];
        this.schemaService.getType(name).subscribe(result => {
          this.type = result;
          this.dataSource = new UniversalDataSource(this.contentService, this.type.name);
          this.displayedColumns = [];
          for (let field of this.type.fields) {
            this.displayedColumns.push(field.name);
          }
        });
      })
    );
  }

  onAddContent() {
    this.contentService.create(this.type.name).subscribe();
  }
}

export class UniversalDataSource extends DataSource<any> {
  constructor(private contentService: ContentService, private typeName: string) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this.contentService.getAll(this.typeName);
  }

  disconnect() {}
}
