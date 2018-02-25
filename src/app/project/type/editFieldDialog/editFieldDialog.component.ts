import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editFieldDialog',
  templateUrl: './editFieldDialog.component.html',
  styleUrls: ['./editFieldDialog.component.css']
})
export class EditFieldDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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

  public field;

  ngOnInit() {
    this.field = JSON.parse(JSON.stringify(this.data.field));
  }

  closeDialog() {
    this.dialogRef.close(this.field);
  }
}
