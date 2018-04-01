import { environment } from './../../../../../environments/environment';
import { Asset } from './../../../../models/asset';
import { Component, OnInit, Inject } from '@angular/core';
import { AssetService } from '../../../services/asset.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-imagePicker',
  templateUrl: './imagePicker.component.html',
  styleUrls: ['./imagePicker.component.css']
})
export class ImagePickerComponent implements OnInit {
  constructor(private assetService: AssetService, public dialogRef: MatDialogRef<ImagePickerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  assetUrl = environment.assetUrl;

  images$: Observable<Asset[]>;

  ngOnInit() {
    this.images$ = this.assetService.getAll(this.data.projectId);
  }

  imageClicked(image) {
    this.dialogRef.close(image.fileName);
  }
}
