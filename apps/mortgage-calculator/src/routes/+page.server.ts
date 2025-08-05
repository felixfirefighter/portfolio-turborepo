// src/routes/+page.server.ts
import { superValidate } from 'sveltekit-superforms/server';
import { mortgageSchema } from '$lib/mortgage/schema/mortgageSchema';
import type { Actions, PageServerLoad } from './$types';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
  const form = await superValidate(event, zod4(mortgageSchema));
  return { form };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod4(mortgageSchema));

    if (!form.valid) {
      // Return the form with errors
      return { form };
    }

    // Perform calculations on the server
    const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = form.data;

    const principal = mortgageAmount;
    const annualInterestRate = interestRate;
    const termYears = mortgageTerm;

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = termYears * 12;

    let monthlyRepayments: number;
    let totalRepayable: number;

    if (mortgageType === 'repayment') {
      if (monthlyInterestRate === 0) {
        monthlyRepayments = principal / numberOfPayments;
        totalRepayable = principal;
      } else {
        monthlyRepayments =
          (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        totalRepayable = monthlyRepayments * numberOfPayments;
      }
    } else {
      // Interest Only mortgage
      monthlyRepayments = principal * monthlyInterestRate;
      totalRepayable = principal + monthlyRepayments * numberOfPayments;
    }

    // Return the calculated results
    return {
      form,
      result: {
        monthlyRepayments,
        totalRepayable,
        showResults: true
      }
    };
  }
};