import { RefObject } from "react";

interface Position {
  x: number;
  y: number;
}

class KeyboardController {
  canvasRef: RefObject<HTMLElement>;
  positionRef: RefObject<Position>;
  constructor(
    canvasRef: RefObject<HTMLElement>,
    positionRef: RefObject<Position>
  ) {
    this.canvasRef = canvasRef;
    this.positionRef = positionRef;
  }
  arrowUp() {
    this.positionRef.current!.y++;
    console.log("위로 움직임");
  }
  arrowDown() {
    this.positionRef.current!.y--;
    console.log("아래로 움직임");
  }
  arrowLeft() {
    this.positionRef.current!.x--;
    console.log("왼쪽으로 움직임");
  }
  arrowRight() {
    this.positionRef.current!.x++;
    console.log("오른쪽으로 움직임");
  }
}

export default KeyboardController;
