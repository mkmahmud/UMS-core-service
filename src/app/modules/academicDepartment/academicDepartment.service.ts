import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from './prisma';

// createing Department
const createAcademicDepartment = async (
  AcademicDepartmentdata: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data: AcademicDepartmentdata,
  });
  return result;
};

// Getting all Department data
const getAllDepartmentData = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: ['title'].map(field => ({
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

  const whereConditons: Prisma.AcademicDepartmentWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};
  const result = await prisma.academicDepartment.findMany({
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

  const total = await prisma.academicDepartment.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// Get singel Department Data
const getDepartmentDataById = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// Update Department by Id
const updateDepartment = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// Delet Department by Id
const deleteDepartment = async (id: string) => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllDepartmentData,
  getDepartmentDataById,
  updateDepartment,
  deleteDepartment,
};
