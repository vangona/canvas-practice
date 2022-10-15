import React, { RefObject, useEffect, useRef, useState } from "react";

const buttonBoxStyle = {
  background: "black",
};

const Map: React.FC = () => {
  const [clickAnimation, setClickAnimation] = useState(1);
  const buttonBox = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onClickCanvas = () => {
    console.log("맵 클릭");
  };

  const onClickButton = (e: Event) => {
    console.log(e.target);
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
    if (buttonBox.current) {
      buttonBox.current.addEventListener("onclick", onClickButton);
    }
    // ref가 설정되면 그 이후에 제어한다.
    if (canvasRef.current) {
      drawRecangle(canvasRef);
    }
  }, []);

  return (
    <>
      <div style={buttonBoxStyle} className="buttonBox">
        <button>1</button>
        <button>2</button>
        <button>3</button>
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
