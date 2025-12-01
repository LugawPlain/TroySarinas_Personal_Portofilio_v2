import * as React from "react";
const IntersectingTiltAngles = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" {...props}>
    <g fill="#FFE082">
      <path d="M0 0v100l500-48 500 48V0H0z" opacity={0.5} />
      <path d="M0 0h1000v52H0z" opacity={0.5} />
      <path d="M0 0v4l500 48 500-48V0H0z" opacity={0.5} />
      <path d="M0 0v4l500 48 500-48V0H0z" />
    </g>
  </svg>
);
export default IntersectingTiltAngles;
