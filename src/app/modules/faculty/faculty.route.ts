import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

// Middleware for routes that require authentication and specific roles
const requireAdminRole = auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN);

// Middleware to validate requests using appropriate validation schema
const validateCreateRequest = validateRequest(FacultyValidation.create);
const validateUpdateRequest = validateRequest(FacultyValidation.update);

// Get Single Faculty Data
router.get('/:id', FacultyController.getFacultyDataById);

// Create  Faculty
router.post(
  '/',
  // requireAdminRole,
  // validateCreateRequest,
  FacultyController.createFaculty
);

// Update  Faculty
router.patch(
  '/:id',
  requireAdminRole,
  validateUpdateRequest,
  FacultyController.updateFacultyById
);

// Delete Faculty Data by Id
router.delete('/:id', requireAdminRole, FacultyController.deleteFacultyById);

// Get All Faculty Data
router.get('/', FacultyController.getAllFaculty);

export const FacultyRoutes = router;
