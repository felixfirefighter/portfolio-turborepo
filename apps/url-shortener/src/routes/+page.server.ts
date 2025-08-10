import { superValidate } from 'sveltekit-superforms';
import type {
  Actions,
  PageServerLoad
} from './$types';
import {
  fail
} from '@sveltejs/kit';
import { urlSchema } from '$lib/home/schema/urlSchema';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
  const form = await superValidate(event, zod4(urlSchema));
  return { form };
};

export const actions: Actions = {
  default: async ({
    request
  }) => {
    const form = await superValidate(request, zod4(urlSchema));

    if (!form.valid) {
      // Return the form with errors
      return { form };
    }

    try {
      // Make the POST request to the Clean URI API from the server
      const response = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          url: form.data.url,
        }),
      });

      const result = await response.json();

      // Check for a successful response from the API
      if (response.ok && result.result_url) {
        return {
          form,
          result: {
            shortenedUrl: result.result_url,
            originalUrl: form.data.url,
          }
        };
      } else {
        // Handle API-specific errors
        return fail(400, {
          form,
          error: result.error || 'Something went wrong. Please try a different URL.',
        });
      }
    } catch (error) {
      // Handle network or other unexpected errors
      console.error('API request failed:', error);
      return fail(500, {
        form,
        error: 'Network error. Please check your internet connection.',
      });
    }
  },
};