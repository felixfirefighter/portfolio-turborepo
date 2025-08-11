import z from "zod";

export const countrySchema = z.object({
  name: z.object({
    common: z.string(),
    nativeName: z.object({ common: z.string() }).optional(),
  }),
  flags: z.object({
    svg: z.string(),
  }),
  population: z.number(),
  region: z.string(),
  capital: z.array(z.string()).optional(),
  borders: z.array(z.string()).optional(),
  tld: z.array(z.string()).optional(),
  subregion: z.string().optional(),
  currencies: z.object({ name: z.string() }).optional(),
  languages: z.string().optional(),
});

export const countriesSchema = z.object({
  countries: z.array(countrySchema),
});

export const countryDetailSchema = z.object({
  country: countrySchema,
  borderCountries: z.array(z.object({
    name: z.string(),
    code: z.string(),
  })),
});