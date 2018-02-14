import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-addProjectDialog',
  templateUrl: './addProjectDialog.component.html',
  styleUrls: ['./addProjectDialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {
  private result: string;

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close(this.result);
  }
}
