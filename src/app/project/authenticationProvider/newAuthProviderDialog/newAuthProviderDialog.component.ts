import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchemaService } from '../../services/schema.service';
import { Type } from '../../../models/type';

@Component({
  selector: 'app-newAuthProviderDialog',
  templateUrl: './newAuthProviderDialog.component.html',
  styleUrls: ['./newAuthProviderDialog.component.css']
})
export class NewAuthProviderDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewAuthProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private schemaService: SchemaService
  ) {}

  public result: any = { mappings: {} };
  public types: Type[];
  public selectedType: any = {};

  ngOnInit() {
    this.schemaService.getAllTypes(this.data.projectId).subscribe(value => {
      this.types = value;
    });
  }

  closeDialog() {
    this.dialogRef.close(this.result);
  }

  onTypeChanged(event) {
    this.schemaService.getType(this.data.projectId, event.value).subscribe(value => {
      console.log(value);
      value.fields = <any>Object.values(value.fields);
      this.selectedType = value;
    });
  }
}
