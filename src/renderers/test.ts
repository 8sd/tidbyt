/**
 * This is the implementation of the class rendere to display a clock.
 */

import { createCanvas } from "canvas";

import { Renderer } from "../renderer";

export class TestRenderer extends Renderer{
  name: String = "test";
  duration: number = 10;

  load (): void {
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

    context.fillStyle = 'blue';
    context.fillRect(0,0,64,32);

    context.fillStyle = 'red';
    context.fillRect(0,0,1,1);

    this.convert2rgb16(canvas);
  }
}