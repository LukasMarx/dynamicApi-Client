import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-newTypeDialog',
    templateUrl: './newTypeDialog.component.html',
    styleUrls: ['./newTypeDialog.component.css']
})
export class NewTypeDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<NewTypeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    private result: string;

    ngOnInit() {}

    closeDialog() {
        this.dialogRef.close(this.result);
    }
}
