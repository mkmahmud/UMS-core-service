import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

// Middleware for routes that require authentication and specific roles
const requireAdminRole = auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN);

// Middleware to validate requests using appropriate validation schema
const validateCreateRequest = validateRequest(StudentValidation.create);
const validateUpdateRequest = validateRequest(StudentValidation.update);

// Get Single Student Data
router.get('/:id', StudentController.getStudentDataById);

// Create  Student
router.post(
  '/',
  requireAdminRole,
  validateCreateRequest,
  StudentController.createStudent
);

// Update  Student
router.patch(
  '/:id',
  requireAdminRole,
  validateUpdateRequest,
  StudentController.updateStudentById
);

// Delete Student Data by Id
router.delete('/:id', requireAdminRole, StudentController.deleteStudentById);

// Get All Student Data
router.get('/', StudentController.getAllStudent);

export const StudentRoutes = router;
