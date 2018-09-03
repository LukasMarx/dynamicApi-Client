import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Type } from '../../../models/type';
import { Widget } from '../../../models/widget';
import { WidgetComponent } from '../../../models/widget-component';
import { WidgetDirective } from '../widget.directive';
import { WidgetResolverService } from '../../services/widget-resolver.service';

@Component({
  selector: 'app-widget-factory',
  templateUrl: './widget-factory.component.html',
  styleUrls: ['./widget-factory.component.css']
})
export class WidgetFactoryComponent implements OnInit {

  @Input() widget: Widget;
  @Input() data: any;
  @Input() type: Type;
  @ViewChild(WidgetDirective) componentHost;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private widgetResolver: WidgetResolverService) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const widget = this.widgetResolver.resolve(this.widget.component)
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(widget);
    const viewContainerRef = this.componentHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<WidgetComponent>componentRef.instance).data = this.data;
  }

}
