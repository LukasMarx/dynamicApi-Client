import { environment } from '../../../environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AssetUploadDialogComponent } from './assetUploadDialog/assetUploadDialog.component';
import { Asset } from '../../models/asset';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  constructor(private dialog: MatDialog, private assetService: AssetService, private route: ActivatedRoute) {}

  delete = false;

  baseUrl = environment.assetUrl;
  assets$;

  public projectId: string;

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = params.id;
      this.assets$ = this.assetService.getAll(params.id);
    });
  }

  onUploadAsset() {
    const dialogRef = this.dialog.open(AssetUploadDialogComponent, { width: '50%', height: '50%' });
    dialogRef.afterClosed().subscribe((files: Set<File>) => {
      if (files) this.assetService.insert(this.projectId, files).subscribe();
    });
  }

  deleteAsset(asset: Asset) {
    this.assetService.delete(this.projectId, asset.id).subscribe();
  }
}
