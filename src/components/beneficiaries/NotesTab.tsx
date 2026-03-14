export default function NotesTab({ notes }: { notes: string }) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-card p-6">
      <h3 className="text-lg font-semibold">Notes</h3>
      <p className="mt-3 leading-7 text-muted-foreground">
        {notes || 'Use this space to keep personal preferences, memorable details, and gifting cues top of mind.'}
      </p>
    </div>
  );
}
