import express, { Request, Response } from 'express';
import { Canvas, createCanvas, loadImage } from 'canvas';

import { fifo } from './fifo'
import { Renderer } from './renderer'
import { ClockRenderer } from './renderers/clock';
import { GradientRenderer } from './renderers/gradient';

const app = express();
const port = 3000;

app.get('/image', (req: Request, res: Response) => {
  fifo.shift().createPNGStream().pipe(res);

  prepareRenderer();
});

app.get('/status', (req: Request, res: Response) => {
  let result = {
    'fifo_length': fifo.length,
    'renderer': renderers[rendererIndex].name,
    'fps': renderers[rendererIndex].fps,
    'duration': renderers[rendererIndex].duration,
  }
  res.send(result);
  /**
   * TODO:
   * - is rendering?
   * - Counter?
   */
});

app.use('/files', express.static('files'))


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

let rendererCounter: number = 0;
let rendererIndex: number = 0;
//const renderers: Renderer [] = [new ClockRenderer ()];
const renderers: Renderer [] = [new GradientRenderer ()];
async function prepareRenderer (): Promise<undefined> {
  if(fifo.length > 30) {// 30*40ms => 1,2 sec to render new images
    return 
  }
  rendererIndex = rendererCounter % renderers.length
  renderers[rendererIndex].render();  
  rendererCounter++;
}

prepareRenderer();