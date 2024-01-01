import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

const EllipsesSvg = (props) => {
  const viewBoxWidth = 400* props.size;
  const viewBoxHeight = 70;

  const textLines = props.text.split("\n");

  return (
    <svg
      id="elipses"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      width="100%"
      height="100%"
      style={{ pointerEvents: "none" }}
    >
      <rect
        id="elip-s-rec1"
        width={viewBoxWidth}
        height={viewBoxHeight}
        rx={30}
        ry={30}
        fill="#b0c5ef"
        strokeWidth="0"
      />
      <text
        x={viewBoxWidth/2}
        y={viewBoxHeight / 1.6}
        fontSize={Math.min(viewBoxWidth / 2, viewBoxHeight / 2.5)}
        fontFamily="serif"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#2c3c30"
      >
        {textLines.map((line, index) => (
          <tspan key={index}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
};

const EllipsesIcon = (props) => {
  return <SvgIcon component={EllipsesSvg} viewBox="0 0 400 60" {...props} />;
};

export default EllipsesIcon;
