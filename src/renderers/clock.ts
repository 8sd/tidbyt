/**
 * This is the implementation of the class rendere to display a clock.
 */

import { createCanvas } from "canvas";
import convert from 'color-convert';

import { fifo } from "../fifo";
import { Renderer } from "../renderer";

export class ClockRenderer extends Renderer{
  name: String = "Clock";

  hour: String = "0";
  minute: String = "0";
  color_start: number = Math.floor(Math.random() * 360)
  dotVisible: boolean = false;

  load (): void {
    let date = new Date();
    let h = `${date.getHours()}`;
    if (h.length == 1) {
      this.hour = ' ' + h;
    } else {
      this.hour = h;
    }
    let m = `${date.getMinutes()}`;
    if (m.length == 1) {
      this.minute = '0' + m;
    } else {
      this.minute = m;
    }
  }

  render (): void {
    this.load();
    for (this.counter = 0; this.counter < this.duration*this.fps; this.counter++) {
      this.renderImage();
    }
  }

  renderImage(): void {
    // Create a canvas
    const canvas = createCanvas(this.x, this.y);
    const context = canvas.getContext('2d');

  context.font = "32px Arial";
  context.fillStyle = '#' + convert.hsv.hex((this.color_start + this.counter)%360, 100, 100);
  context.textBaseline = "bottom"; 
  context.textAlign = "center"; 

  // Change Canvas
  // tooggle dot
  if (this.counter % this.fps == 0) {
    this.dotVisible = !this.dotVisible;
  }
  if (this.dotVisible) {
    context.fillText(`${this.hour}:${this.minute}`, 32, 32, 64);
  } else {
    context.fillText(`${this.hour} ${this.minute}`, 32, 32, 64);
  }

  context.fillStyle = 'black';
  // Fade in
  if (this.counter < 32)
    context.fillRect(0, 0, 64, 32-this.counter);
  // Fade out
  if (this.counter > this.duration*this.fps-32)
    context.fillRect(0, 0, 64, this.counter-this.duration*this.fps+32);
  fifo.push(canvas);
  };
}