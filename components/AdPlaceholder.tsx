interface AdPlaceholderProps {
  label?: string;
  className?: string;
}

/** Placeholder for ad units (e.g. between cards, sidebar, after hero). */
export default function AdPlaceholder({ label = 'Ad', className = '' }: AdPlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 border-dashed border-blue-grey/40 bg-blue-grey/5 min-h-[100px] text-blue-grey text-sm ${className}`}
      aria-hidden
    >
      {label}
    </div>
  );
}
