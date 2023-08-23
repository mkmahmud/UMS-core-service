import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from './prisma';

// createing Student
const createStudent = async (Studentdata: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data: Studentdata,
  });
  return result;
};

// Getting all Student data
const getAllStudentData = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: ['studentId', 'firstName', 'email', 'contactNo'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.StudentWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};
  const result = await prisma.student.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.student.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// Get singel Student Data
const getStudentDataById = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// Update Student by Id
const updateStudent = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// Delet Student by Id
const deleteStudent = async (id: string) => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
  });

  return result;
};

export const StudentService = {
  createStudent,
  getAllStudentData,
  getStudentDataById,
  updateStudent,
  deleteStudent,
};
