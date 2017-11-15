import { SchemaService } from './services/schema.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {
  types: any[];

  constructor(private schemaService: SchemaService) {}

  ngOnInit() {
    this.schemaService.getAllTypes().subscribe(result => (this.types = result));
  }
}
