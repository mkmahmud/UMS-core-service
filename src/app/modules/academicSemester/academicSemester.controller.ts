import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

// Creating academic Semester controller
const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(data);
    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic Semester created successfully',
      data: result,
    });
  }
);

// Getting All data
const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'code',
    'startMonth',
    'endMonth',
  ]);
  const options = pick(req.query, ['page', 'limit', 'shortBy', 'shortOrder']);

  const result = await AcademicSemesterService.getAllData(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semeter data Retrived successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// Get Semester by Id
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semster data fetched!',
    data: result,
  });
});

// Update Semester by ID
const updateSemesterById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AcademicSemesterService.updateSemester(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semster data Updated!',
    data: result,
  });
});

// Delete Semester by ID
const deleteSemesterById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.deleteSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semster Deleted!',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getDataById,
  updateSemesterById,
  deleteSemesterById,
};
