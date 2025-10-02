import React from "react";

// Define the shape of the props the component accepts
interface InfoIconProps extends React.SVGProps<SVGSVGElement> {
  // You can add custom props here if needed, but we'll include all standard SVG props
  // via React.SVGProps<SVGSVGElement>
}

/**
 * A React component rendering the 'Information' icon.
 * @param {InfoIconProps} props - Standard SVG attributes like width, height, className, etc.
 * @returns {JSX.Element}
 */
const InfoIcon: React.FC<InfoIconProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  viewBox = "0 0 24 24",
  ...rest
}) => {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fill={fill}
      // Spread the rest of the props (like className, style, etc.) onto the SVG element
      {...rest}
    >
      <path
        fill={fill}
        d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      />
    </svg>
  );
};

export default InfoIcon;
