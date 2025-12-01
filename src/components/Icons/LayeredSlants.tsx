import * as React from "react";
const LayeredSlants = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" {...props}>
    <g fill="#FFFFFF">
      <rect fill="#2E186A" width="100%" height="100%" />
      <path d="M0 100V0h1000v4L0 100z" />
      <path d="M0 100V0h1000v24L0 100z" opacity={0.5} />
      <path d="M0 100V0h1000v44L0 100z" opacity={0.4} />
      <path d="M0 100V0h1000v64L0 100z" opacity={0.4} />
      <path d="M0 100V0h1000v84L0 100z" opacity={0.2} />
    </g>
  </svg>
);
export default LayeredSlants;
