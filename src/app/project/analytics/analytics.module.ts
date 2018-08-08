import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutes } from './analytics.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SocketService } from '../services/socket.service';

@NgModule({
  imports: [CommonModule, AnalyticsRoutes, NgxChartsModule],
  providers: [SocketService],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule {}
