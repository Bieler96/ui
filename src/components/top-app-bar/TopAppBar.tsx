import React from 'react';
import cx from 'clsx';

export type TopAppBarProps = {
  title: string;
  navigationIcon?: React.ReactNode;
  actionIcons?: React.ReactNode[];
  className?: string;
  center?: boolean;
};

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  navigationIcon,
  actionIcons,
  className,
  center,
}) => {
  const baseClasses = 'flex items-center p-4 bg-surface text-on-surface';

  return (
    <header className={cx(baseClasses, className, { 'justify-between': !center, 'justify-center': center })}>
      {!center && (
        <>
          <div className="flex items-center">
            {navigationIcon && <div className="mr-4">{navigationIcon}</div>}
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            {actionIcons && actionIcons.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        </>
      )}
      {center && (
        <div className="flex items-center justify-center w-full">
          {navigationIcon && <div className="absolute left-4">{navigationIcon}</div>}
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="absolute right-4 flex items-center space-x-4">
            {actionIcons && actionIcons.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
