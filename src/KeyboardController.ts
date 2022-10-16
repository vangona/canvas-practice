import { RefObject } from "react";

interface Position {
  x: number;
  y: number;
  movingFlag: boolean;
}

class KeyboardController {
  canvasRef: RefObject<HTMLElement>;
  positionRef: RefObject<Position>;
  velocity: number;
  maxVelocity: number;
  durationTime: number;

  constructor(
    canvasRef: RefObject<HTMLElement>,
    positionRef: RefObject<Position>
  ) {
    this.canvasRef = canvasRef;
    this.positionRef = positionRef;
    this.velocity = 1;
    this.maxVelocity = 5;
    this.durationTime = 0;
  }

  keyUp() {
    this.positionRef.current!.movingFlag = false;
    this.velocity = 0.1;
    this.durationTime = 0;
  }

  arrowUp() {
    this.durationTime += 0.1;
    this.positionRef.current!.movingFlag = true;
    if (this.velocity < this.maxVelocity) {
      this.velocity += 0.2;
    }
    this.positionRef.current!.y -= this.velocity;
  }
  arrowDown() {
    this.durationTime += 0.1;
    this.positionRef.current!.movingFlag = true;
    if (this.velocity < this.maxVelocity) {
      this.velocity += 0.2;
    }
    this.positionRef.current!.y += this.velocity;
  }
  arrowLeft() {
    this.durationTime += 0.1;
    this.positionRef.current!.movingFlag = true;
    if (this.velocity < this.maxVelocity) {
      this.velocity += 0.2;
    }
    this.positionRef.current!.x -= this.velocity;
  }
  arrowRight() {
    this.durationTime += 0.1;
    this.positionRef.current!.movingFlag = true;
    if (this.velocity < this.maxVelocity) {
      this.velocity += 0.2;
    }
    this.positionRef.current!.x += this.velocity;
  }
}

export default KeyboardController;
