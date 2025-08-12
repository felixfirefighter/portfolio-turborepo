import z from 'zod';
import type { PageServerLoad } from './$types';
import { countriesSchema } from '$lib/home/types/country.schema';

export const load: PageServerLoad = async ({ fetch }) => {
  // Fetch all countries from the REST Countries API
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital');

  if (!res.ok) {
    // Throw an error if the API request fails
    return { countries: [] };
  }
  const countries = await res.json();

  const validation = z.array(countriesSchema.shape.countries.element).safeParse(countries);
  // If validation fails, return an empty array or handle the error
  if (!validation.success) {
    console.error('Data validation failed:', validation.error);
    return { countries: [] };
  }

  return { countries: validation.data };
};