export default function ErrorMessage({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className="flex space-x-1">
      <p className={`text-xs !leading-tight text-destructive ${className}`}>
        {children}
      </p>
    </div>
  );
}
