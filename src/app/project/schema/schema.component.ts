import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { MatDialog } from '@angular/material';
import { NewTypeDialogComponent } from './newTypeDialog/newTypeDialog.component';
import { concat } from 'async';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {
  constructor(private schemaService: SchemaService, private dialog: MatDialog, private route: ActivatedRoute) {}

  types = [];
  private projectId: string;

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = params.id;
      this.schemaService.getAllTypes(this.projectId).subscribe(response => {
        this.types = <any>response;
      });
    });
  }

  trackbyName(index, item) {
    return item.name;
  }

  onAddType() {
    const dialogRef = this.dialog.open(NewTypeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.schemaService.addType(this.projectId, result).subscribe();
    });
  }

  onRemoveType(type) {
    this.schemaService.removeType(this.projectId, type.name).subscribe();
  }
}
