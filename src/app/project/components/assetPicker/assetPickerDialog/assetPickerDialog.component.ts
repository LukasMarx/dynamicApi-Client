import { AssetService } from '../../../services/asset.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-assetPickerDialog',
  templateUrl: './assetPickerDialog.component.html',
  styleUrls: ['./assetPickerDialog.component.css']
})
export class AssetPickerDialogComponent implements OnInit {
  closeResult: string;

  @ViewChild('content') content;

  items: any;

  private assetUrl = environment.baseUrl;

  constructor(public dialogRef: MatDialogRef<AssetPickerDialogComponent>, private assetService: AssetService, @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    this.assetService.getAll(this.data.projectId).subscribe(value => {
      this.items = value;
    });
  }

  private select(item: any) {
    this.closeResult = item.fileName;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close(this.closeResult);
  }
}
