import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StudentService } from './student.service';

// Creating  Student controller
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await StudentService.createStudent(data);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Student created successfully',
    data: result,
  });
});

// Getting All Student data
const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const options = pick(req.query, ['page', 'limit', 'shortBy', 'shortOrder']);

  const result = await StudentService.getAllStudentData(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Student data Retrived successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// Get Student by Id
const getStudentDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getStudentDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Student data fetched!',
    data: result,
  });
});

// Update Student by ID
const updateStudentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await StudentService.updateStudent(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Student data Updated!',
    data: result,
  });
});

// Delete Student by ID
const deleteStudentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Student Deleted!',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getAllStudent,
  getStudentDataById,
  updateStudentById,
  deleteStudentById,
};
