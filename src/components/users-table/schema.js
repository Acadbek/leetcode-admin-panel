import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
// export const usersSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   email: z.string(),
//   phone: z.string(),
//   description: z.string(),
//   address: z.string(),
// });

export const usersSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  active: z.boolean(),
  companyId: z.string().nullable(),
  companyName: z.string().nullable(),
  createdAt: z.string(),
  groups: z.array(z.string()).nullable(),
});
