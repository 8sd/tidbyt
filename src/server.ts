import express, { Request, Response } from 'express';

import { fifo } from './fifo'
import { Renderer } from './renderer'
import { ClockRenderer } from './renderers/clock';
import { GradientRenderer } from './renderers/gradient';
import { TestRenderer } from './renderers/test';

const app = express();
const port = 3000;

app.get('/image', async (req: Request, res: Response) => {
  console.log('.');

  const pixels = fifo.shift();

  // Convert Uint16Array to a Buffer
  const buffer = Buffer.from(pixels.buffer);
  // Set headers
  res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Length': buffer.length,
  });
  res.send(buffer);

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
//const renderers: Renderer [] = [new ClockRenderer (), new GradientRenderer ()];
const renderers: Renderer [] = [new TestRenderer ()];

async function prepareRenderer (): Promise<undefined> {
  if(fifo.length > 30) {// 30*40ms => 1,2 sec to render new images
    return 
  }
  rendererIndex = rendererCounter % renderers.length
  renderers[rendererIndex].render();  
  rendererCounter++;
}

prepareRenderer();