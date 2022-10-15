import React, { Ref, RefObject, useEffect, useRef } from "react";

const Map: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onClickCanvas = () => {
    console.log("맵 클릭");
  };

  const drawRecangle = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  };

  useEffect(() => {
    // ref가 설정되면 그 이후에 제어한다.
    if (canvasRef.current) {
      drawRecangle(canvasRef);
    }
  }, []);

  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={onClickCanvas}
      ref={canvasRef}
    ></canvas>
  );
};

export default Map;
