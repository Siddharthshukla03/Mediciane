
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline text-primary">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mt-1 text-sm md:text-base max-w-2xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 mt-3 sm:mt-0 flex-shrink-0">{actions}</div>}
      </div>
      <hr className="my-6 border-border" />
    </div>
  );
}
