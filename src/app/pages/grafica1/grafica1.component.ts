import { Component } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];
  public data1: any = [35, 45, 10, 20];
}
