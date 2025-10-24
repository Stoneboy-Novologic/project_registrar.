export default function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="p-8 text-center text-black/50">
      <div className="font-semibold text-black/70">{title}</div>
      {subtitle ? <div className="text-sm mt-1">{subtitle}</div> : null}
    </div>
  );
}


