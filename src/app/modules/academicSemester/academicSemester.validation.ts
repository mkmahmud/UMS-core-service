import { z } from 'zod';

// Handel varification for creating Academic Semester
const create = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is required for creating Academic Semester',
    }),
    title: z.string({
      required_error: 'Title is required for creating Academic Semester',
    }),
    code: z.string({
      required_error: 'Code is required for creating Academic Semester',
    }),
    startMonth: z.string({
      required_error: 'Start Month is required for creating Academic Semester',
    }),
    endMonth: z.string({
      required_error: 'End Month is required for creating Academic Semester',
    }),
  }),
});

// Handel varification for Updateing Academic Semester
const update = z.object({
  body: z.object({
    year: z.number().optional(),
    title: z.string().optional(),
    code: z.string().optional(),
    startMonth: z.string().optional(),
    endMonth: z.string().optional(),
  }),
});

export const academicSemesterValidation = {
  create,
  update,
};
