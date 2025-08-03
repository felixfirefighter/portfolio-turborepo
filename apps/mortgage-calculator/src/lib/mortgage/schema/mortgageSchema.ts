import { z } from 'zod';

export const mortgageSchema = z.object({
  mortgageAmount: z.number().min(1, 'Mortgage amount must be a positive number'),
  mortgageTerm: z.number().min(1, 'Mortgage term must be at least 1 year'),
  interestRate: z.number().min(0, 'Interest rate must be a non-negative number'),
  mortgageType: z.enum(['repayment', 'interest-only']).default('repayment')
});

export type MortgageSchema = z.infer<typeof mortgageSchema>;