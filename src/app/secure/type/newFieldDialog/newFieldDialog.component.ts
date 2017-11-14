import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-newFieldDialog',
  templateUrl: './newFieldDialog.component.html',
  styleUrls: ['./newFieldDialog.component.css']
})
export class NewFieldDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  private result: string;

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close(this.result);
  }
}
