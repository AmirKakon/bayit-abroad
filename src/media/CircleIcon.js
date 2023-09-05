import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

const CircleSvg = (props) => (
  <svg
    id="circle"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    width={props.size}
    height={props.size}
  >
    <ellipse
      id="circle-s-ellipse1"
      rx="39.76223"
      ry="40.983844"
      transform="matrix(1.2449 0 0 1.207793 50 50)"
      fill="#e6deca"
      stroke="#2c3c30"
      stroke-width="1"
    />
  </svg>
);

const CircleIcon = (props) => {
  return <SvgIcon component={CircleSvg} viewBox="0 0 100 100" {...props} />;
};

export default CircleIcon;
