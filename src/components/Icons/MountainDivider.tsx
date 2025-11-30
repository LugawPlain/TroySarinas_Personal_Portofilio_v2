import * as React from "react";
const MountainDivider = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" {...props}>
    <g fill="#FFFFFF">
      <rect fill="#2E186A" width="100%" height="100%" />
      <path d="m0 4 150 40h160l190 50 190-50h160l150-40V0H0v4z" />
    </g>
  </svg>
);
export default MountainDivider;
