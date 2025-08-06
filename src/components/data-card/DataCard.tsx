import React from "react";
import { Card } from "../card/Card";
import clsx from "clsx";

const DataCardContext = React.createContext<any>(null);

export type DataCardConfig = {
  visibleFields: string[];
  hiddenFields: string[];
};

type DataCardProps = {
  data?: any;
  config?: DataCardConfig;
  variant: 'elevated' | 'filled' | 'outlined';
} & React.ComponentProps<typeof Card>;

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({ data, config, variant, children, className, ...props }, ref) => {
    return (
      <DataCardContext.Provider value={data}>
        <Card
          ref={ref}
          className={clsx(className)}
          variant={variant}
          {...props}
        >
          {children}
          {config && data && (
            <DataCardBody config={config} data={data} />
          )}
        </Card>
      </DataCardContext.Provider>
    );
  }
);
DataCard.displayName = "DataCard";

const DataCardBody = ({ config, data }: { config: DataCardConfig, data: any }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="space-y-2 pt-4">
      {config.visibleFields.map((field) => (
        <div key={field} className="flex justify-between text-sm">
          <span className="text-muted-foreground">{field}</span>
          <span>{String(data[field])}</span>
        </div>
      ))}
      {isExpanded && config.hiddenFields.map((field) => (
        <div key={field} className="flex justify-between text-sm">
          <span className="text-muted-foreground">{field}</span>
          <span>{String(data[field])}</span>
        </div>
      ))}
      {config.hiddenFields.length > 0 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-primary hover:underline mt-2"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

const DataCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("flex flex-row items-center justify-between space-y-0 pb-2", className)}
    {...props}
  />
));
DataCardHeader.displayName = "DataCardHeader";

type DataCardTitleProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'> & {
  children?: React.ReactNode | ((data: any) => React.ReactNode);
};

const DataCardTitle = React.forwardRef<HTMLHeadingElement, DataCardTitleProps>(({ className, children, ...props }, ref) => {
  const data = React.useContext(DataCardContext);
  return (
    <h3
      ref={ref}
      className={clsx("text-sm font-medium leading-none", className)}
      {...props}
    >
      {typeof children === 'function' ? children(data) : children}
    </h3>
  );
});
DataCardTitle.displayName = "DataCardTitle";

const DataCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx("pt-2", className)} {...props} />
));
DataCardContent.displayName = "DataCardContent";

type DataCardValueProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: React.ReactNode | ((data: any) => React.ReactNode);
};

const DataCardValue = React.forwardRef<HTMLDivElement, DataCardValueProps>(({ className, children, ...props }, ref) => {
  const data = React.useContext(DataCardContext);
  return (
    <div
      ref={ref}
      className={clsx("text-2xl font-bold", className)}
      {...props}
    >
      {typeof children === 'function' ? children(data) : children}
    </div>
  );
});
DataCardValue.displayName = "DataCardValue";

type DataCardDescriptionProps = Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'> & {
  children?: React.ReactNode | ((data: any) => React.ReactNode);
};

const DataCardDescription = React.forwardRef<HTMLParagraphElement, DataCardDescriptionProps>(({ className, children, ...props }, ref) => {
  const data = React.useContext(DataCardContext);
  return (
    <p
      ref={ref}
      className={clsx("text-xs text-muted-foreground", className)}
      {...props}
    >
      {typeof children === 'function' ? children(data) : children}
    </p>
  );
});
DataCardDescription.displayName = "DataCardDescription";

export { DataCard, DataCardHeader, DataCardTitle, DataCardContent, DataCardValue, DataCardDescription };