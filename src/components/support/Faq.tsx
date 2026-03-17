'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

import { fetcher } from '@/lib/fetcher';

export default function Faq() {
  const { data, error } = useSWR('/api/support/faq', fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqList = Array.isArray(data) ? data : [];

  const filteredFaqs = useMemo(() => {
    return faqList.filter(
      (faq: { category?: string; question?: string; answer?: string }) =>
        (selectedCategory === 'All' || faq.category === selectedCategory) &&
        ((faq.question ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (faq.answer ?? '').toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [faqList, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(faqList.map((faq: { category?: string }) => faq.category).filter(Boolean)))];
  }, [faqList]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex gap-4 my-4">
        <Input
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <Button
              key={category as string}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category as string)}>
              {category as string}
            </Button>
          ))}
        </div>
      </div>
      <Accordion type="single" collapsible>
        {filteredFaqs.map((faq: any) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              {faq.answer}
              <div className="flex items-center justify-end gap-2 mt-4">
                <span>Was this helpful?</span>
                <Button variant="ghost" size="icon">
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ThumbsDown className="w-4 h-4" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
