import { SchemaService } from './services/schema.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  types: any[];

  constructor(private schemaService: SchemaService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schemaService.getAllTypes(params.id).subscribe(result => (this.types = result));
    });
  }
}
