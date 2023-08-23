import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

// Creating academic Faculty controller
const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(data);
    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic Faculty created successfully',
      data: result,
    });
  }
);

// Getting All Faculty data
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const options = pick(req.query, ['page', 'limit', 'shortBy', 'shortOrder']);

  const result = await AcademicFacultyService.getAllFacultyData(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty data Retrived successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// Get Faculty by Id
const getFacultyDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.getFacultyDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty data fetched!',
    data: result,
  });
});

// Update Faculty by ID
const updateFacultyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty data Updated!',
    data: result,
  });
});

// Delete Faculty by ID
const deleteFacultyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Deleted!',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
  getFacultyDataById,
  updateFacultyById,
  deleteFacultyById,
};
