import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PastGiftsTab({ gifts }: { gifts: any[] }) {
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
