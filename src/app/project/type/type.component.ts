import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { NewFieldDialogComponent } from './newFieldDialog/newFieldDialog.component';
import { EditFieldDialogComponent } from './editFieldDialog/editFieldDialog.component';
import { DataSource } from '@angular/cdk/table';
import { Type, CRUDPermission } from '../../models/type';

const defaultRoles = ['anonymous', 'roAuthKey', 'authKey'];

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TypeComponent implements OnInit {
  projectId: any;
  public type: Type;
  public workingCopy: Type;

  public unsavedChanges = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private schemaService: SchemaService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.parent.parent.params.subscribe(params => {
        this.projectId = params.id;
        this.route.params.subscribe(params => {
          const name = <string>params['name'];
          this.schemaService.getType(this.projectId, name).subscribe(result => {
            this.type = JSON.parse(JSON.stringify(result));
            this.type.fields = {};
            if (result.fields) {
              for (let field of result.fields) {
                this.type.fields[field.name] = field;
              }
            }
            this.workingCopy = JSON.parse(JSON.stringify(this.type));
            if (!this.workingCopy.permissions) {
              this.workingCopy.permissions = {};
            }
            for (let role of defaultRoles) {
              if (!this.workingCopy.permissions[role]) {
                this.workingCopy.permissions[role] = new CRUDPermission();
                this.workingCopy.permissions[role].role = role;
              }
            }
          });
        });
      })
    );
  }

  onAddField() {
    const dialogRef = this.dialog.open(NewFieldDialogComponent, { width: '50%', height: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.workingCopy.fields) this.workingCopy.fields = {};

        this.workingCopy.fields[result.name] = result;

        this.unsavedChanges = true;

        this.workingCopy = JSON.parse(JSON.stringify(this.workingCopy));
      }
    });
  }

  onSaveChanges() {
    let copy = JSON.parse(JSON.stringify(this.workingCopy));
    copy.fields = [];
    for (let key in this.workingCopy.fields) {
      copy.fields.push(this.workingCopy.fields[key]);
    }
    delete copy.__typename;

    for (let field of copy.fields) {
      delete field.__typename;
    }

    for (let key in copy.permissions) {
      delete copy.permissions[key].__typename;
    }

    this.schemaService.updateType(this.projectId, copy.name, copy).subscribe(() => {
      this.unsavedChanges = false;
    });
  }

  onEditField(field) {
    console.log(field);
    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '50%',
      height: '50%',
      data: { field: field }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.schemaService
    //       .addFieldToType(this.projectId, this.type.name, { name: result, type: 'STRING' })
    //       .subscribe();
    //   }
    // });
  }

  onRemoveField(field) {
    const type = JSON.parse(JSON.stringify(this.type));

    if (!type.fields) type.fields = [];

    let index = type.fields.indexOf(field);
    type.fields.splice(index, 1);

    type.fields.forEach(field => {
      delete field.__typename;
    });

    delete type.__typename;
    this.schemaService.updateType(this.projectId, this.type.name, type).subscribe();
  }

  onPermissionsChanged() {
    this.unsavedChanges = true;
  }
}
