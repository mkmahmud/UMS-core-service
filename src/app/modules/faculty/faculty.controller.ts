import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FacultyService } from './faculty.service';

// Creating  Faculty controller
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await FacultyService.createFaculty(data);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Faculty created successfully',
    data: result,
  });
});

// Getting All Faculty data
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const options = pick(req.query, ['page', 'limit', 'shortBy', 'shortOrder']);

  const result = await FacultyService.getAllFacultyData(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Faculty data Retrived successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// Get Faculty by Id
const getFacultyDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.getFacultyDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Faculty data fetched!',
    data: result,
  });
});

// Update Faculty by ID
const updateFacultyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await FacultyService.updateFaculty(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Faculty data Updated!',
    data: result,
  });
});

// Delete Faculty by ID
const deleteFacultyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Faculty Deleted!',
    data: result,
  });
});

export const FacultyController = {
  createFaculty,
  getAllFaculty,
  getFacultyDataById,
  updateFacultyById,
  deleteFacultyById,
};
