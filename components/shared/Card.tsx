import React from 'react';

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  noPadding?: boolean;
  lift?: boolean;
}

export function Card({
  title,
  subtitle,
  action,
  noPadding = false,
  lift = false,
  children,
  className = '',
  style,
  ...props
}: CardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden ${lift ? 'card-liftable' : ''} ${className}`}
      style={{
        background: 'var(--bg-raised)',
        boxShadow: 'var(--shadow-card)',
        ...style,
      }}
      {...props}
    >
      {(title || subtitle || action) && (
        <div
          className="px-6 py-4 flex justify-between items-center shrink-0"
          style={{ borderBottom: '1px solid var(--line)' }}
        >
          <div>
            {title && (
              <h3
                className="text-base leading-snug m-0"
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm mt-0.5 mb-0" style={{ color: 'var(--ink-muted)' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`${noPadding ? '' : 'p-6'} flex-grow`}>{children}</div>
    </div>
  );
}

export function CardStat({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Card className="h-full" lift>
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--amber-soft)', color: 'var(--amber)' }}
          >
            {icon}
          </div>
        )}
        <div>
          <p
            className="text-[10px] tracking-[0.16em] uppercase mb-2"
            style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-dm), sans-serif' }}
          >
            {title}
          </p>
          <div
            className="text-2xl leading-none"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontWeight: 600,
              color: 'var(--ink)',
            }}
          >
            {value}
          </div>
          {subtitle && (
            <p className="text-sm mt-1.5" style={{ color: 'var(--ink-muted)' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
