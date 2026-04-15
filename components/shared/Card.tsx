import React from 'react';

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export function Card({ title, subtitle, action, noPadding = false, children, className = '', ...props }: CardProps) {
  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col ${className}`} 
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <div>
            {title && <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base m-0 leading-tight">{title}</h3>}
            {subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-0">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`${noPadding ? '' : 'p-5'} flex-grow`}>
        {children}
      </div>
    </div>
  );
}

export function CardStat({ title, value, subtitle, icon }: { title: string, value: React.ReactNode, subtitle?: React.ReactNode, icon?: React.ReactNode }) {
  return (
    <Card className="h-full">
      <div className="flex items-center">
        {icon && (
          <div className="w-12 h-12 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-4">
            {icon}
          </div>
        )}
        <div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            {title}
          </div>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none">
            {value}
          </div>
          {subtitle && (
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
