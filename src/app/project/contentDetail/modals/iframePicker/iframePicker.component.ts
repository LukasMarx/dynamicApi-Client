import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframePicker',
  templateUrl: './iframePicker.component.html',
  styleUrls: ['./iframePicker.component.css']
})
export class IframePickerComponent implements OnInit {
  closeResult: { src?: string } = {};

  constructor() {}

  ngOnInit() {}
}
