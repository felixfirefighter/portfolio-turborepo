import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  // Fetch country data based on the URL parameter
  const res = await fetch(`https://restcountries.com/v3.1/name/${params.country_name}?fullText=true`);

  if (!res.ok) {
    // Throw a 404 error if the country is not found
    error(404, { message: 'Country not found' });
  }

  const countryData = await res.json();
  const country = countryData[0];

  // Fetch border country names using their codes
  let borderCountries = [];
  if (country.borders && country.borders.length > 0) {
    const borderCodes = country.borders.join(',');
    const borderRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);

    if (borderRes.ok) {
      const borderData = await borderRes.json();
      borderCountries = borderData.map((bc: any) => ({
        name: bc.name.common,
        code: bc.cca3
      }));
    }
  }

  return {
    country,
    borderCountries
  };
};