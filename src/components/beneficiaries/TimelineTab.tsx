export default function TimelineTab({ timeline }: { timeline: any[] }) {
  if (timeline.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/15 bg-primary/[0.03] p-6 text-sm text-muted-foreground">
        Activity will appear here as you add events and build gifting history.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {timeline.map((item) => (
        <div key={item.id} className="flex gap-4">
          <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
          <div className="rounded-2xl border border-primary/10 bg-card p-4">
            <p className="font-bold">{item.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(item.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
