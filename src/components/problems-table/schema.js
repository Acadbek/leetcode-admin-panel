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

export const problemsSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  testCases: z.string(),
  difficulty: z.string(),
  companyId: z.string().nullable(),
  companyName: z.string().nullable(),
  createdAt: z.string(),
  lessons: z.array(z.string()).nullable(),
  createdById: z.string().nullable(),
  createdByName: z.string().nullable(),
});
