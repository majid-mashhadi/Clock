import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  @ViewChild('clock', { static: false }) clock: ElementRef;

  @ViewChild('face', { static: false }) face: ElementRef;

  @ViewChild('seconds', { static: false }) seconds: ElementRef;
  @ViewChild('minutes', { static: false }) minutes: ElementRef;
  @ViewChild('hours', { static: false }) hours: ElementRef;

  context: CanvasRenderingContext2D;

  @Input()
  width: number = 200;
  @Input()
  height: number = 200;
  @Input()
  x: number = 100;
  @Input()
  y: number = 100;

  center: IPoint;

  l1: number = 20;
  padding: number = 5;
  time: Date;

  show: boolean = false;
  constructor() { }

  ngOnInit(): void {

    this.center = {
      x: this.width / 2,
      y: this.height / 2,
    };
  }
  setSecods() {
    const el: HTMLCanvasElement = this.seconds.nativeElement;
    const left = this.center.x - 6; // (el.clientWidth / 2);
    el.style.left = `${left}px`;
    const top = this.center.y - el.clientHeight - 1.5;
    el.style.top = `${top}px`;
  }

  setMinutes() {
    const el: HTMLCanvasElement = this.minutes.nativeElement;
    const left = this.center.x - 6; // - 1;
    el.style.left = `${left}px`;
    const top = this.center.y - el.clientHeight - 1.5;
    el.style.top = `${top}px`;
  }

  setHours() {
    const el: HTMLCanvasElement = this.hours.nativeElement;
    const left = this.center.x - 11;
    el.style.left = `${left}px`;
    const top = this.center.y - el.clientHeight - 2;
    el.style.top = `${top}px`;
  }

  setAngles() {
    const time = new Date();
    const second = time.getSeconds();
    const minute = time.getMinutes();
    const hour = time.getHours();

    const hourRadian = (hour * 30 + (minute * 1.0 / 2)) % 360;
    const minRadian = minute * 6 + (second * 1.0 / 10);
    const secRadian = second * 6;

    const seconds = this.seconds.nativeElement;
    seconds.style.transform = `rotate(${secRadian}deg)`;

    const minutes = this.minutes.nativeElement;
    minutes.style.transform = `rotate(${minRadian}deg)`;

    const hours = this.hours.nativeElement;
    hours.style.transform = `rotate(${hourRadian}deg)`;

  }

  runClock() {
    this.setAngles();

    setTimeout(() => {
      this.show = true;
    }, 0);

    setInterval(() => {
      this.setAngles();
    }, 1000);

  }
  setupImages() {
    this.setSecods();
    this.setMinutes();
    this.setHours();
    this.runClock();
  }

  ngAfterViewInit() {
    this.setupImages();
    return;

    const el: HTMLCanvasElement = this.clock.nativeElement;
    this.context = el.getContext('2d');
    el.style.width = this.width.toString();
    el.style.height = this.height.toString();

    // this.drawClock();
    setInterval(() => {
      this.time = new Date();
      this.drawClock();
      this.drawSeconds(this.time);
    }, 1000);

  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawClock() {

    this.clear();
    this.context.beginPath();
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 9;
    this.context.arc(this.center.x, this.center.y, (this.height / 2) - 9, 0, 2 * Math.PI);
    this.context.stroke();

    this.context.beginPath();
    this.context.strokeStyle = 'red';
    this.context.lineWidth = 2;
    this.context.arc(this.center.x, this.center.y, (this.height / 2) - 9, 0, 2 * Math.PI);
    this.context.stroke();


    this.context.beginPath();
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 3;
    this.context.arc(this.center.x, this.center.y, 1.5, 0, 2 * Math.PI);
    this.context.stroke();


    // this.context.moveTo(this.x / 2, 0);
    // this.context.lineTo(this.x / 2, this.l1);
  }

  drawSeconds(time: Date) {

    const r = (this.height / 2) - (this.l1 + this.padding);

    const second = time.getSeconds() - 15;
    const minute = time.getMinutes() - 15;
    const hour = time.getHours() - 15;

    const hourRadian = hour * 360 / 12 * Math.PI / 180;
    const minRadian = minute * 360 / 60 * Math.PI / 180;
    const secRadian = second * 360 / 60 * Math.PI / 180;

    this.drawLine(secRadian, 'red', 1, 1);
    this.drawLine(minRadian, 'green', 3, 0.85);
    this.drawLine(hourRadian, 'blue', 5, 0.7);

  }

  drawLine(radian: number, style: string, lineWidth: number, length: number) {
    const r = (this.height / 2) - (this.l1 + this.padding);

    let newX = length * r * Math.cos(radian) + this.center.x;
    let newY = length * r * Math.sin(radian) + this.center.y;

    this.context.beginPath();
    this.context.strokeStyle = style;
    this.context.lineWidth = lineWidth;
    this.context.moveTo(this.center.x, this.center.y);
    this.context.lineTo(newX, newY);
    this.context.stroke();
  }
}

export interface IPoint {
  x: number;
  y: number;
}