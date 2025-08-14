import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  // Fetch country data based on the URL parameter
  const { country } = params

  console.log('aaa server', params)

  const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);

  if (!res.ok) {
    // Throw a 404 error if the country is not found
    error(404, { message: 'Country not found' });
  }

  const countryDetails = await res.json()

  console.log('aaa', countryDetails)
  return {
    countryDetails,
  };
};

