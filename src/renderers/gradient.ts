/**
 * This is the implementation of the class rendere to display a clock.
 */

import { createCanvas } from "canvas";

import { fifo } from "../fifo";
import { Renderer } from "../renderer";

export class GradientRenderer extends Renderer{
  name: String = "Gradient";

  color_start: number = Math.floor(Math.random() * 64)
  dotVisible: boolean = false;

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

    const offset = this.counter%64;
    let gradient = context.createLinearGradient(-this.color_start - offset, this.counter, 3 * canvas.width - this.color_start - offset, -this.counter);
    //console.log(`x1: ${(-this.color_start - offset)}, x2: ${3 * canvas.width - this.color_start - offset}, offset: ${offset}, width: ${(3 * canvas.width - this.color_start - offset) - (-this.color_start - offset)}`)
    
    gradient.addColorStop(0  /14, "red");
    gradient.addColorStop(1  /14, "yellow");
    gradient.addColorStop(2  /14, "green");
    gradient.addColorStop(3  /14, "blue");
    gradient.addColorStop(4  /14, "purple");  
    gradient.addColorStop(5  /14, "red");
    gradient.addColorStop(6  /14, "yellow");
    gradient.addColorStop(7  /14, "green");
    gradient.addColorStop(8  /14, "blue");
    gradient.addColorStop(9  /14, "purple");
    gradient.addColorStop(10 /14, "red");
    gradient.addColorStop(11 /14, "yellow");
    gradient.addColorStop(12 /14, "green");
    gradient.addColorStop(13 /14, "blue");
    gradient.addColorStop(14 /14, "purple");
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    fifo.push(canvas);
  }
}