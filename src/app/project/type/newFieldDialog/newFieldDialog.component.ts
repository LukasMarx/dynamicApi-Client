import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'app-newFieldDialog',
  templateUrl: './newFieldDialog.component.html',
  styleUrls: ['./newFieldDialog.component.css']
})
export class NewFieldDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private typeService: SchemaService
  ) { }

  types = [
    {
      name: 'Integer',
      value: 'INTEGER'
    },
    {
      name: 'String',
      value: 'STRING'
    },
    {
      name: 'Text',
      value: 'BIG_TEXT'
    },
    {
      name: 'Asset',
      value: 'ASSET'
    },
    {
      name: 'Date',
      value: 'DATE'
    }
  ];

  public field: any = {};

  ngOnInit() {
    this.typeService.getAllTypes(this.data.projectId).subscribe(types => {
      types.forEach(type => {
        this.types.push({ name: type.name, value: type.name });
      });
    })
  }

  closeDialog() {
    this.dialogRef.close(this.field);
  }
}
