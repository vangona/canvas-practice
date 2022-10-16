import React, { useEffect, useRef, useState } from "react";
import { ANIMATIONS } from "../constants";
import KeyboardController from "../KeyboardController";

const buttonBoxStyle = {
  background: "black",
};

const Map: React.FC = () => {
  const [clickAnimation, setClickAnimation] = useState(
    ANIMATIONS.DRAW_RED_RECT
  );
  const requestAnimationRef = useRef<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      KeyboardController.arrowUp();
    } else if (e.key === "ArrowDown") {
      KeyboardController.arrowDown();
    } else if (e.key === "ArrowLeft") {
      KeyboardController.arrowLeft();
    } else if (e.key === "ArrowRight") {
      KeyboardController.arrowRight();
    }
  };

  const onClickButtonBox: React.MouseEventHandler = (e) => {
    const eventTarget = e.target as HTMLElement;
    if (eventTarget.dataset.animation) {
      setClickAnimation(eventTarget.dataset.animation);
    }
  };

  const drawRectangle = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  };

  const drawRectangleAnimation = () => {
    const update = () => {
      const now = new Date();
      const ctx = canvasRef.current!.getContext("2d")!;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.save();
      ctx.clearRect(0, 0, 150, 150);
      ctx.translate(75, 75);
      ctx.scale(0.4, 0.4);
      ctx.rotate(-Math.PI / 2);
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";

      // 시계판 - 시
      ctx.save();
      for (var i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
      }
      ctx.restore();

      // 시계판 - 분
      ctx.save();
      ctx.lineWidth = 5;
      for (i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
          ctx.beginPath();
          ctx.moveTo(117, 0);
          ctx.lineTo(120, 0);
          ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
      }
      ctx.restore();

      var sec = now.getSeconds();
      var min = now.getMinutes();
      var hr = now.getHours();
      hr = hr >= 12 ? hr - 12 : hr;

      ctx.fillStyle = "black";

      // 시간 표시 - 시
      ctx.save();
      ctx.rotate(
        hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
      );
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(80, 0);
      ctx.stroke();
      ctx.restore();

      // 시간 표시 - 분
      ctx.save();
      ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(-28, 0);
      ctx.lineTo(112, 0);
      ctx.stroke();
      ctx.restore();

      // 시간 표시 - 초
      ctx.save();
      ctx.rotate((sec * Math.PI) / 30);
      ctx.strokeStyle = "#D40000";
      ctx.fillStyle = "#D40000";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(83, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.lineWidth = 14;
      ctx.strokeStyle = "#325FA2";
      ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
      ctx.stroke();

      ctx.restore();
      requestAnimationRef.current = window.requestAnimationFrame(update);
    };

    requestAnimationRef.current = window.requestAnimationFrame(update);
  };

  const drawMovingCharacter = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  };

  const onClickCanvas = () => {
    console.log("맵 클릭! 애니메이션 : ", clickAnimation);
    switch (clickAnimation) {
      case ANIMATIONS.DRAW_RED_RECT:
        window.cancelAnimationFrame(requestAnimationRef.current);
        drawRectangle();
        break;
      case ANIMATIONS.DRAW_CLOCK_ANIMATION:
        window.cancelAnimationFrame(requestAnimationRef.current);
        drawRectangleAnimation();
        break;
      case ANIMATIONS.DRAW_MOVING_CHARACTER:
        window.addEventListener("keydown", onKeydownHandler);
        window.cancelAnimationFrame(requestAnimationRef.current);
        drawMovingCharacter();
        break;
      case ANIMATIONS.STOP:
        window.cancelAnimationFrame(requestAnimationRef.current);
        break;
    }
  };

  const animations = [
    ANIMATIONS.DRAW_RED_RECT,
    ANIMATIONS.DRAW_CLOCK_ANIMATION,
    ANIMATIONS.DRAW_MOVING_CHARACTER,
    ANIMATIONS.STOP,
  ];

  return (
    <>
      <div
        onClick={onClickButtonBox}
        style={buttonBoxStyle}
        className="buttonBox"
      >
        {animations.map((animation, index) => (
          <button key={index} data-animation={animation}>
            {animation}
          </button>
        ))}
      </div>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={onClickCanvas}
        ref={canvasRef}
      ></canvas>
    </>
  );
};

export default Map;
