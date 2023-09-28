import { z } from 'zod';

const Geo = z.object({
  lat: z.string(),
  lng: z.string(),
});

const Address = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: Geo,
});

const Company = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export const UserZodObject = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: Address,
  phone: z.string(),
  //cannot use .string().url() because it expects a proper url with http prefix
  website: z.string(),
  company: Company,
});

export type User = z.infer<typeof UserZodObject>;
