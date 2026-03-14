import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PastGiftsTab({ gifts }: { gifts: any[] }) {
  if (gifts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/15 bg-primary/[0.03] p-6 text-sm text-muted-foreground">
        No completed gift history has been recorded for this beneficiary yet.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Gift</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gifts.map((gift) => (
          <TableRow key={gift.id}>
            <TableCell>{gift.giftName}</TableCell>
            <TableCell>{new Date(gift.date).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">${gift.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
