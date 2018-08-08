import { environment } from '../../../../environments/environment';
import { Asset } from '../../../models/asset';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AssetPickerDialogComponent } from './assetPickerDialog/assetPickerDialog.component';

@Component({
  selector: 'app-assetPicker',
  templateUrl: './assetPicker.component.html',
  styleUrls: ['./assetPicker.component.css']
})
export class AssetPickerComponent implements OnInit {
  @Input() source: string;
  @Input() projectId: string;
  @Output() sourceChange = new EventEmitter<Asset>();

  private assetUrl = environment.baseUrl;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onClick() {
    const dialogRef = this.dialog.open(AssetPickerDialogComponent, {
      data: { projectId: this.projectId },
      width: '50%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sourceChange.emit(result);
    });
  }
}
