import { z } from 'zod';

// Handel varification for creating  Semester
const create = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'Student Id is required for creating  Student',
    }),
    firstName: z.string({
      required_error: 'First Name is required for creating  Student',
    }),
    lastName: z.string({
      required_error: 'Last Name  is required for creating  Student',
    }),
    middleName: z.string({
      required_error: 'Middle Name is required for creating  Student',
    }),
    profileImage: z.string({
      required_error: 'Profile Image is required for creating  Student',
    }),
    email: z.string({
      required_error: 'Email is required for creating  Student',
    }),
    contactNo: z.string({
      required_error: 'Contact No is required for creating  Student',
    }),
    gender: z.string({
      required_error: 'Gender No is required for creating  Student',
    }),
    bloodGroup: z.string({
      required_error: 'Blood  No is required for creating  Student',
    }),
    academicSemesterId: z.string({
      required_error:
        'Academic Semester Id No is required for creating  Student',
    }),
    academicDepartmentId: z.string({
      required_error:
        'Academic Department Id No is required for creating  Student',
    }),
    academicFacultyId: z.string({
      required_error:
        'Academic Faculty Id No is required for creating  Student',
    }),
  }),
});

// Handel varification for Updateing  Semester
const update = z.object({
  body: z.object({
    studentId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicSemesterId: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const StudentValidation = {
  create,
  update,
};
