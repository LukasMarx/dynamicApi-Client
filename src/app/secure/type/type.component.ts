import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { NewFieldDialogComponent } from './newFieldDialog/newFieldDialog.component';
import { EditFieldDialogComponent } from './editFieldDialog/editFieldDialog.component';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  public type;

  private subscriptions: Subscription[] = [];

  constructor(
    private schemaService: SchemaService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        const name = <string>params['name'];
        this.schemaService.getType(name).subscribe(result => {
          this.type = result;
        });
      })
    );
  }

  onAddField() {
    const dialogRef = this.dialog.open(NewFieldDialogComponent, { width: '50%', height: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.schemaService.addFieldToType(this.type.name, result).subscribe();
      }
    });
  }

  onEditField(field) {
    console.log(field);
    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '50%',
      height: '50%',
      data: { field: field }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.schemaService
          .addFieldToType(this.type.name, { name: result, type: 'STRING' })
          .subscribe();
      }
    });
  }

  onRemoveField(field) {
    this.schemaService.removeFieldFromType(this.type.name, field.name).subscribe();
  }
}
