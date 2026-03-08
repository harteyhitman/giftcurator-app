import { z } from 'zod';

export const eventSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  eventDate: z.date(),
  eventFrequency: z.string(),
  eventType: z.string(),
  beneficiary: z.string(),
  maxAmount: z.number().positive(),
  specialMessage: z.string(),
  buyCard: z.boolean(),
  giftType: z.string(),
  personalizeGift: z.boolean(),
});
