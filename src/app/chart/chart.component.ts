import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  rawData: any
  hourData: any
  canvas: any
  ctx: any;
  myChart: any
  time: any
  temp: any
  temp1: any
  time1: any
  temp2: any
  time2: any
  temp3: any
  time3: any

  constructor(private ds: DataService, private we: DashboardComponent) { }

  ngOnInit(): void {
    this.canvas = document.getElementById('myChart');
    Chart.register(...registerables)
    this.rawData = this.we.foreCastData
    this.ctx = this.we.date
    this.populateChart();
  }

  populateChart() {
    this.hourData = this.rawData.map((arr: any) => arr.hour)
    this.time1 = this.hourData[0].map((arr: any) => arr.time.slice(11, 13))
    this.temp1 = this.hourData[0].map((arr: any) => arr.temp_c)
    this.time2 = this.hourData[1].map((arr: any) => arr.time.slice(11, 13))
    this.temp2 = this.hourData[1].map((arr: any) => arr.temp_c)
    this.time3 = this.hourData[2].map((arr: any) => arr.time.slice(11, 13))
    this.temp3 = this.hourData[2].map((arr: any) => arr.temp_c)
    if (this.ctx == this.rawData[0].date_epoch) {
      this.temp = this.temp1
      this.time = this.time1
    }
    else if (this.ctx == this.rawData[1].date_epoch) {
      this.temp = this.temp2
      this.time = this.time2
    }
    else {
      this.temp = this.temp3
      this.time = this.time3
    }
    // console.log("temp_c from timeline", this.time, this.temp);
    this.chart()
  }

  chart() {
    const rootStyles = getComputedStyle(document.documentElement);
    const fontColor = rootStyles.getPropertyValue('--primary-font').trim() || '#f3f4f8';
    const gridColor = rootStyles.getPropertyValue('--border-color').trim() || 'rgba(255,255,255,0.08)';
    const accent = rootStyles.getPropertyValue('--accent').trim() || '#4d8dff';

    const gradient = this.canvas.getContext('2d').createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, 'rgba(77, 141, 255, 0.45)');
    gradient.addColorStop(1, 'rgba(77, 141, 255, 0.02)');

    this.myChart = new Chart(this.canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Hourly Temperature (°C)',
          data: this.temp,
          backgroundColor: gradient,
          borderColor: accent,
          pointBackgroundColor: accent,
          pointBorderColor: '#fff',
          pointRadius: 3,
          borderWidth: 3,
          tension: 0.35,
          fill: true,
        }],
        labels: this.time
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: fontColor }
          }
        },
        scales: {
          x: {
            ticks: { color: fontColor },
            grid: {
              display: false
            }
          },
          y: {
            ticks: { color: fontColor },
            grid: {
              color: gridColor
            }
          }
        }
      }
    });
  }





}
