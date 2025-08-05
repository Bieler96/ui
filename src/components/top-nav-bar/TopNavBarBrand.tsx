import clsx from "clsx";
import React from "react";

export interface TopNavBarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TopNavBarBrand({
  children,
  className,
  ...props
}: TopNavBarBrandProps) {
  return (
    <div className={clsx("flex items-center", className)} {...props}>
      {children}
    </div>
  );
}
