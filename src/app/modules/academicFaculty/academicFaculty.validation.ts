import { z } from 'zod';

// Handel varification for creating Academic Semester
const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required for creating Academic Faculty',
    }),
  }),
});

// Handel varification for Updateing Academic Semester
const update = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const academicFacultyValidation = {
  create,
  update,
};
