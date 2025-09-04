import React from 'react';
import { animated, SpringValue, useSpring } from '@react-spring/web';
import clsx from 'clsx';

export interface CustomDrawerProps {
  children: React.ReactNode;
  open: boolean; // Keep open for overlay and initial state
  onOpenChange: (open: boolean) => void;
  direction?: "left" | "right" | "bottom";
  x: SpringValue<number>; // Receive SpringValue directly
  windowWidth: number; // New prop for window width
}

export function CustomDrawer({
  children,
  open,
  onOpenChange,
  direction = "left",
  x,
  windowWidth, // Use windowWidth
}: CustomDrawerProps) {
  const overlayOpacity = x.to([
    -windowWidth, // Closed
    0, // Open
  ], [
    0, // Opacity when closed
    1, // Opacity when open (bg-black/40)
  ]);

  const drawerClasses = clsx(
    "fixed top-0 h-full bg-surface shadow-lg",
    direction === "left" && "left-0 w-80",
    direction === "right" && "right-0 w-80",
    direction === "bottom" && "bottom-0 w-full h-1/2"
  );

  return (
    <>
      <animated.div
        className="fixed inset-0 bg-black/40"
        style={{
          opacity: overlayOpacity,
          pointerEvents: x.to(val => (val === -windowWidth ? 'none' : 'auto')),
        }}
        onClick={() => onOpenChange(false)}
      />
      <animated.div
        style={{ x }}
        className={drawerClasses}
      >
        {children}
      </animated.div>
    </>
  );
}
