import { z } from 'zod';

export const beneficiarySchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Invalid mobile number'),
  dob: z.date(),
  address: z.string(),
  relationship: z.string(),
  gender: z.string(),
});
