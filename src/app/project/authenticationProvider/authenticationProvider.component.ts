import { Component, OnInit } from '@angular/core';
import { NewAuthProviderDialogComponent } from './newAuthProviderDialog/newAuthProviderDialog.component';
import { MatDialog } from '@angular/material';
import { AuthenticationProviderService } from '../services/authenticationProvider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authenticationProvider',
  templateUrl: './authenticationProvider.component.html',
  styleUrls: ['./authenticationProvider.component.css']
})
export class AuthenticationProviderComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private authProviderService: AuthenticationProviderService,
    private route: ActivatedRoute
  ) {}

  public projectId;
  public providers$;

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = params.id;
      this.providers$ = this.authProviderService.getAll(this.projectId);
    });
  }

  public onAddProvider() {
    const dialogRef = this.dialog.open(NewAuthProviderDialogComponent, {
      data: { projectId: this.projectId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authProviderService
          .addAuthenticationProvider(this.projectId, result)
          .subscribe();
      }
    });
  }
}
