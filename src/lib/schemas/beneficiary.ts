import { z } from 'zod';

export const beneficiarySchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  dob: z.date({
    message: 'Date of birth is required',
  }),
});
