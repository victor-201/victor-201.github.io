import React from "react";

export interface VictorBotIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * VictorBotIcon
 * Custom minimalist SVG insignia for Victor AI:
 * Fuses the 'V' monogram of Victor with a celestial 4-point star representing
 * artificial intelligence in a starry night sky.
 */
export const VictorBotIcon: React.FC<VictorBotIconProps> = ({
  size = 16,
  className = "",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Sleek Minimalist 'V' Wings */}
      <path
        d="M4.5 5.5L12 19.5L19.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Celestial 4-Point AI Star */}
      <path
        d="M12 3C12 6.2 13.8 8 17 8C13.8 8 12 9.8 12 13C12 9.8 10.2 8 7 8C10.2 8 12 6.2 12 3Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default VictorBotIcon;
