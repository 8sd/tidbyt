import { Canvas, createCanvas } from 'canvas';

class Fifo {
  fifo: Canvas[] = [];

  push (c: Canvas): void {
    this.fifo.push(c)
  }

  shift (): Canvas {
    if (this.fifo.length > 1) {
      let c = this.fifo.shift();
      if (c)
        return c;
    } 
    return this.fifo[0];
  }

  get length (): number {
    return this.fifo.length;
  }
}

export const fifo: Fifo = new Fifo();