import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

const CircleSvg = (props) => {
  const scale = props.size / 100; // Assuming 100 is the default size
  const viewBoxSize = 100 * scale;

  const ellipseRx = 39.76223 * scale;
  const ellipseRy = 40.983844 * scale;

  return (
    <svg
      id="circle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      width={props.size}
      height={props.size}
      style={{ pointerEvents: 'none' }}
    >
      <ellipse
        id="circle-s-ellipse1"
        cx={viewBoxSize / 2}
        cy={viewBoxSize / 2}
        rx={ellipseRx}
        ry={ellipseRy}
        fill="#e6deca"
        stroke="#2c3c30"
        strokeWidth={1 * scale}
      />
      <text 
        x={viewBoxSize / 2} 
        y={viewBoxSize / 2 - 3} 
        fontSize="18" 
        fontFamily="serif" 
        textAnchor="middle" 
        fill="#2c3c30"
      >
        <tspan x={viewBoxSize / 2} dy="0">{props.text[0]}</tspan>
        <tspan x={viewBoxSize / 2} dy="15">{props.text[1]}</tspan>
      </text>
    </svg>
  );
};

const CircleIcon = (props) => {
  return <SvgIcon component={CircleSvg} viewBox="0 0 100 100" {...props} />;
};

export default CircleIcon;
