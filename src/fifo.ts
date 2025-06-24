/**
 * This class defines a simple types fifo
 */

class Fifo {
  fifo: Uint16Array[] = [];

  push (pixels: Uint16Array): void {
    this.fifo.push(pixels)
  }

  shift (): Uint16Array {
    if (this.fifo.length > 1) {
      let pixels = this.fifo.shift();
      if (pixels)
        return pixels;
    } 
    return this.fifo[0];
  }

  get length (): number {
    return this.fifo.length;
  }
}

export const fifo: Fifo = new Fifo();