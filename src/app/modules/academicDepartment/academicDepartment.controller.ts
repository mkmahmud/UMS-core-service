import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

// Creating academic Department controller
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartment(
      data
    );
    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic Department created successfully',
      data: result,
    });
  }
);

// Getting All Department data
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const options = pick(req.query, ['page', 'limit', 'shortBy', 'shortOrder']);

  const result = await AcademicDepartmentService.getAllDepartmentData(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department data Retrived successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// Get Department by Id
const getDepartmentDataById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.getDepartmentDataById(
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department data fetched!',
      data: result,
    });
  }
);

// Update Department by ID
const updateDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AcademicDepartmentService.updateDepartment(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department data Updated!',
    data: result,
  });
});

// Delete Department by ID
const deleteDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Deleted!',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllDepartment,
  getDepartmentDataById,
  updateDepartmentById,
  deleteDepartmentById,
};
