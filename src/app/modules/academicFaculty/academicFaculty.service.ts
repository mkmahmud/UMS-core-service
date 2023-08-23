import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from './prisma';

// createing Faculty
const createAcademicFaculty = async (
  AcademicFacultydata: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: AcademicFacultydata,
  });
  return result;
};

// Getting all Faculty data
const getAllFacultyData = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: ['title', 'code', 'startMonth', 'endMonth'].map(field => ({
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

  const whereConditons: Prisma.AcademicSemesterWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};
  const result = await prisma.academicSemester.findMany({
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

  const total = await prisma.academicFaculty.count();
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
const getFacultyDataById = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// Update Faculty by Id
const updateFaculty = async (
  id: string,
  payload: Partial<AcademicFaculty>
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// Delet Faculty by Id
const deleteFaculty = async (id: string) => {
  const result = await prisma.academicFaculty.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllFacultyData,
  getFacultyDataById,
  updateFaculty,
  deleteFaculty,
};
