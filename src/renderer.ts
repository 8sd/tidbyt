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
}