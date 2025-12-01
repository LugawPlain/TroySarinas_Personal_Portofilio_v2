import * as React from "react";
const ArcDivider = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" {...props}>
    <g fill="#FFFFFF">
      <rect fill="#FFE082" width="100%" height="100%" />
      <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" />
    </g>
  </svg>
);
export default ArcDivider;
