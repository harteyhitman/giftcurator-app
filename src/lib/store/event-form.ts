import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { eventSchema } from '@/lib/schemas/event';
import { z } from 'zod';

type EventFormState = z.infer<typeof eventSchema>;

interface EventFormStore {
  data: EventFormState;
  setData: (data: EventFormState) => void;
}

export const useEventFormStore = create<EventFormStore>()(
  persist(
    (set) => ({
      data: {
        eventName: '',
        eventFrequency: 'one-off',
        buyCard: false,
        personalizeGift: false,
        eventDate: new Date(),
        eventType: '',
        beneficiary: '',
        maxAmount: 0,
        specialMessage: '',
        giftType: '',
      },
      setData: (data) => set({ data }),
    }),
    {
      name: 'event-form-storage',
    }
  )
);
