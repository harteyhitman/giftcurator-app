export default function TimelineTab({ timeline }: { timeline: any[] }) {
  return (
    <div className="space-y-8">
      {timeline.map((item) => (
        <div key={item.id} className="flex items-center gap-4">
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
          <div>
            <p className="font-bold">{item.event}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(item.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
