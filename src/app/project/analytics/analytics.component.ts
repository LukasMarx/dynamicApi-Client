import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  data = [{ name: 'data', series: [{ name: new Date().getTime(), value: 0 }] }];
  usercount = 0;
  readings;

  constructor(private socketService: SocketService) {
    socketService.usercount().subscribe((data: any) => {
      this.usercount = data;
    });
    const timer = setInterval(() => {
      const entries = [...this.data[0].series.filter(x => x.name > new Date().getTime() - 300000)];
      this.data[0].series = entries;
      this.data[0].series.push({ name: new Date().getTime(), value: this.usercount });
      this.data = [...this.data];
    }, 5000);

    // this.readings = socketService.readings();
  }

  ngOnInit() {}
}
