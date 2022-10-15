import React, { RefObject, useEffect, useRef, useState } from "react";

const buttonBoxStyle = {
  background: "black",
};

const Map: React.FC = () => {
  const [clickAnimation, setClickAnimation] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onClickButtonBox: React.MouseEventHandler = (e) => {
    const eventTarget = e.target as HTMLElement;
    if (eventTarget.dataset.animation === "drawRedRect") {
      setClickAnimation(1);
    } else if (eventTarget.dataset.animation === "drawRedRectAnimation") {
      setClickAnimation(2);
    }
  };

  const drawRectangle = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  };

  const onClickCanvas = () => {
    console.log("맵 클릭! 애니메이션 : ", clickAnimation);
    switch (clickAnimation) {
      case 1:
        drawRectangle(canvasRef);
        break;
      case 2:
        break;
      case 3:
        break;
    }
  };

  return (
    <>
      <div
        onClick={onClickButtonBox}
        style={buttonBoxStyle}
        className="buttonBox"
      >
        <button data-animation="drawRedRect">직사각형 그리기</button>
        <button data-animation="drawRedRectAnimation">
          직사각형 그리기 애니메이션
        </button>
        <button>애니메이션</button>
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
