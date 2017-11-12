import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { MatDialog } from '@angular/material';
import { NewTypeDialogComponent } from './newTypeDialog/newTypeDialog.component';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {
  constructor(private schemaService: SchemaService, private dialog: MatDialog) {}

  types = [];

  ngOnInit() {
    this.schemaService.getAllTypes().subscribe(response => {
      console.log(response);
      this.types = response;
    });
  }

  trackbyName(index, item) {
    return item.name;
  }

  onAddType() {
    const dialogRef = this.dialog.open(NewTypeDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.schemaService.addType(result).subscribe();
    });
  }
}
