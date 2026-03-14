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
        title: '',
        date: new Date(),
        type: '',
        beneficiaryId: '',
      },
      setData: (data) => set({ data }),
    }),
    {
      name: 'event-form-storage',
    }
  )
);
