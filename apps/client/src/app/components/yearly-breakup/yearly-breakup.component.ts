import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '@core/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

@Component({
  selector: 'app-yearly-breakup',
  templateUrl: './yearly-breakup.component.html',
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppYearlyBreakupComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public yearlyChart!: Partial<yearlyChart> | any;

  constructor() {
    this.yearlyChart = {
      color: '#adb5bd',
      series: [38, 40, 25],
      labels: ['2025', '2024', '2023'],
      chart: {
        width: 125,
        type: 'donut',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '75%',
          },
        },
      },
      stroke: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },
      colors: ['#5D87FF', '#ECF2FF', '#F9F9FD'],

      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }
}
