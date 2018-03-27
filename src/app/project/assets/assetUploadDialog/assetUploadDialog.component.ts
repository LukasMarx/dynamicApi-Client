import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-assetUploadDialog',
  templateUrl: './assetUploadDialog.component.html',
  styleUrls: ['./assetUploadDialog.component.css']
})
export class AssetUploadDialogComponent implements OnInit {
  @ViewChild('file') file;

  files: Set<File> = new Set();

  constructor(public dialogRef: MatDialogRef<AssetUploadDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onClick() {
    this.file.nativeElement.click();
  }

  ngOnInit() {}

  onChange() {
    const files = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  closeDialog() {
    this.dialogRef.close(this.files);
  }
}
