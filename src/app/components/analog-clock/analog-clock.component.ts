import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
export class AnalogClockComponent implements OnInit {
  @ViewChild('sec', { static: false }) sec: ElementRef;
  @ViewChild('min', { static: false }) min: ElementRef;
  @ViewChild('hour', { static: false }) hour: ElementRef;


  @Input()
  top: number = 50;
  @Input()
  left: number = 50;

  hours: any[] = [];
  date: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= 12; i++) {
      this.hours.push(i);
    }
  }

  ngAfterViewInit() {
    this.date = new Date();
    this.updateClock(this.date);
    setInterval(() => {
      this.date = new Date();
      this.updateClock(this.date);
    }, 1000);
  }
  updateClock(date: Date) {
    const second = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();

    const hourRadian = (hour * 30 + (minute * 1.0 / 2)) % 360;
    const minRadian = minute * 6 + (second * 1.0 / 10);
    const secRadian = second * 6;

    this.sec.nativeElement.style.transform = `rotate(${secRadian}deg)`;
    this.min.nativeElement.style.transform = `rotate(${minRadian}deg)`;
    this.hour.nativeElement.style.transform = `rotate(${hourRadian}deg)`;
  }

}
