interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
