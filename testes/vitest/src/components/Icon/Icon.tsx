import type { ReactNode } from "react";

export interface IconProps {
  /** Width and height in pixels. */
  size?: number;
}

interface IconBaseProps extends IconProps {
  children: ReactNode;
}

/**
 * Shared 24x24 stroke-icon frame. The colour comes from `currentColor`, so the
 * caller styles the icon by setting `color` on the surrounding link/button.
 */
function Icon({ size = 24, children }: Readonly<IconBaseProps>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default Icon;
