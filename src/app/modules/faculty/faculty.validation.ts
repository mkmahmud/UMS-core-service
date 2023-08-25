import { z } from 'zod';

// Handel varification for creating  Semester
const create = z.object({
  body: z.object({
    facultyId: z.string({
      required_error: 'Faculty Id is required for creating  Faculty',
    }),
    firstName: z.string({
      required_error: 'First Name is required for creating  Faculty',
    }),
    lastName: z.string({
      required_error: 'Last Name  is required for creating  Faculty',
    }),
    middleName: z.string({
      required_error: 'Middle Name is required for creating  Faculty',
    }),
    profileImage: z.string({
      required_error: 'Profile Image is required for creating  Faculty',
    }),
    email: z.string({
      required_error: 'Email is required for creating  Faculty',
    }),
    contactNo: z.string({
      required_error: 'Contact No is required for creating  Faculty',
    }),
    gender: z.string({
      required_error: 'Gender No is required for creating  Faculty',
    }),
    bloodGroup: z.string({
      required_error: 'Blood  No is required for creating  Faculty',
    }),
    academicDepartmentId: z.string({
      required_error:
        'Academic Department Id No is required for creating  Faculty',
    }),
    academicFacultyId: z.string({
      required_error:
        'Academic Faculty Id No is required for creating  Faculty',
    }),
  }),
});

// Handel varification for Updateing  Semester
const update = z.object({
  body: z.object({
    facultyId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const FacultyValidation = {
  create,
  update,
};
