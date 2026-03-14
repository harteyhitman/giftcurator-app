import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(2, 'Event title is required'),
  date: z.date({
    message: 'Event date is required',
  }),
  type: z.string().min(1, 'Event type is required'),
  beneficiaryId: z.string().min(1, 'Select a beneficiary'),
});
