import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-langPicker',
    templateUrl: './langPicker.component.html',
    styleUrls: ['./langPicker.component.css']
})
export class LangPickerComponent {
    closeResult = { lang: null, src: null };

    @ViewChild('content') content;

    items = [
        {
            name: 'Typescript',
            value: 'typescript',
            selected: false
        },
        {
            name: 'Javascript',
            value: 'javascript',
            selected: false
        },
        {
            name: 'HTML',
            value: 'html',
            selected: false
        },
        {
            name: 'CSS',
            value: 'css',
            selected: false
        }
    ];

    constructor(
        public dialogRef: MatDialogRef<LangPickerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    closeDialog() {
        this.dialogRef.close(this.closeResult);
    }
}
