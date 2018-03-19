import { Component, OnInit } from '@angular/core';
import { KeyService } from '../services/key.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  authKey;
  projectId;

  constructor(private keyService: KeyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = params.id;
    });
  }

  generateKey() {
    this.keyService.getKey(this.projectId).subscribe(value => {
      this.authKey = value;
    });
  }
}
