import { Faculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from './prisma';

// createing Faculty
const createFaculty = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
  });
  return result;
};

// Getting all Faculty data
const getAllFacultyData = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: ['FacultyId', 'firstName', 'email', 'contactNo'].map(field => ({
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

  const whereConditons: Prisma.FacultyWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};
  const result = await prisma.faculty.findMany({
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

  const total = await prisma.faculty.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// Get singel Faculty Data
const getFacultyDataById = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// Update Faculty by Id
const updateFaculty = async (
  id: string,
  payload: Partial<Faculty>
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// Delet Faculty by Id
const deleteFaculty = async (id: string) => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
  });

  return result;
};

export const FacultyService = {
  createFaculty,
  getAllFacultyData,
  getFacultyDataById,
  updateFaculty,
  deleteFaculty,
};
