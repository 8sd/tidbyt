import { Canvas } from 'canvas';
import sharp from 'sharp';
import { fifo } from './fifo';
/**
 * This is the base class for the renderers in ./renderers/*.
 */

export abstract class Renderer {
  duration: number = 30;
  fps: number = 25;
  x: number = 64;
  y: number = 32;

  counter: number = 0;

  name: String = "Name of Renderer";
  abstract load (): void;
  abstract render (): void;
  abstract renderImage (): void;

    /***
     * The function returns a buffer which contains a list.
     * The list contains four values per pixel: RGBX.
     * This function drops the fourth value and converts the three RGB values into the RGB16-format.
     */
    
  async convert2rgb16(canvas: Canvas): Promise<void> {
    let sharpObject = sharp();

    // Pipe the PNG stream to the sharp object
    canvas.createPNGStream().pipe(sharpObject);

    const data = await sharpObject.raw()  
      .toColorspace('rgb16') // Convert to 16-bit RGB colorspace
      .toBuffer()

    let pixels: Uint16Array = new Uint16Array(this.x * this.y);
    for (let pixelID = 0; pixelID < this.x * this.y; pixelID++) {
      let r = data[pixelID*4];   //6 bit for red
      let g = data[pixelID*4+1]; //5 bit for green 
      let b = data[pixelID*4+2]; //5 bit for blue
      let val = ((g & 0x1f) << 11) | ((r & 0x3f) << 5) | (b & 0x1f); // GRB 5/6/5
      pixels[pixelID] = ((val & 0xff) << 8) | ((val & 0xff00) >> 8); // Switch bytes 
    } 
    
    fifo.push(pixels);
  }
}