import z from "zod";

export const countrySchema = z.object({
  name: z.object({
    common: z.string(),
  }),
  flags: z.object({
    png: z.string(),
    alt: z.string()
  }),
  population: z.number(),
  region: z.string(),
  capital: z.array(z.string()).optional(),
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