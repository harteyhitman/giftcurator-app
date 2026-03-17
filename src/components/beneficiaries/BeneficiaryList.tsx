import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { List, LayoutGrid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import useSWR from 'swr';
import BeneficiaryCard from './BeneficiaryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BeneficiaryList() {
  const { data, error } = useSWR('/api/beneficiaries', fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [relationshipFilter, setRelationshipFilter] = useState('all');
  const [sort, setSort] = useState('recent');
  const [view, setView] = useState('grid');

  if (error) return <div>Failed to load</div>;
  if (!data) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  const list = Array.isArray(data) ? data : [];
  const sortedData = [...list].sort((a: any, b: any) => {
    if (sort === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sort === 'name') {
      return a.firstName.localeCompare(b.firstName);
    }
    return 0;
  });

  const filteredData = sortedData
    .filter((beneficiary: any) => {
      if (relationshipFilter === 'all') return true;
      return beneficiary.relationship === relationshipFilter;
    })
    .filter((beneficiary: any) => {
      const fullName = `${beneficiary.firstName} ${beneficiary.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select onValueChange={setRelationshipFilter} defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Relationships</SelectItem>
              <SelectItem value="Friend">Friend</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSort} defaultValue="recent">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ToggleGroup type="single" value={view} onValueChange={setView} defaultValue="grid">
          <ToggleGroupItem value="grid">
            <LayoutGrid className="w-5 h-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list">
            <List className="w-5 h-5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div
        className={cn(
          'gap-4',
          view === 'grid'
            ? 'grid md:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col'
        )}
      >
        {filteredData.map((beneficiary: any) => (
          <BeneficiaryCard key={beneficiary.id} {...beneficiary} />
        ))}
      </div>
    </div>
  );
}
