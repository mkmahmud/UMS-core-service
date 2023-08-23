import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// Middleware for routes that require authentication and specific roles
const requireAdminRole = auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN);

// Middleware to validate requests using appropriate validation schema
const validateCreateRequest = validateRequest(academicFacultyValidation.create);
const validateUpdateRequest = validateRequest(academicFacultyValidation.update);

// Get Single Faculty Data
router.get('/:id', academicFacultyController.getFacultyDataById);

// Create Academic Faculty
router.post(
  '/',
  requireAdminRole,
  validateCreateRequest,
  academicFacultyController.createAcademicFaculty
);

// Update Academic Faculty
router.patch(
  '/:id',
  requireAdminRole,
  validateUpdateRequest,
  academicFacultyController.updateFacultyById
);

// Delete Faculty Data by Id
router.delete(
  '/:id',
  requireAdminRole,
  academicFacultyController.deleteFacultyById
);

// Get All Faculty Data
router.get('/', academicFacultyController.getAllFaculty);

export const academicFacultyRoutes = router;
