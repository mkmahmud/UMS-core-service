import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

// Middleware for routes that require authentication and specific roles
const requireAdminRole = auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN);

// Middleware to validate requests using appropriate validation schema
const validateCreateRequest = validateRequest(
  academicDepartmentValidation.create
);
const validateUpdateRequest = validateRequest(
  academicDepartmentValidation.update
);

// Get Single Department Data
router.get('/:id', academicDepartmentController.getDepartmentDataById);

// Create Academic Department
router.post(
  '/',
  validateCreateRequest,
  academicDepartmentController.createAcademicDepartment
);

// Update Academic Department
router.patch(
  '/:id',
  requireAdminRole,
  validateUpdateRequest,
  academicDepartmentController.updateDepartmentById
);

// Delete Department Data by Id
router.delete(
  '/:id',
  requireAdminRole,
  academicDepartmentController.deleteDepartmentById
);

// Get All Department Data
router.get('/', academicDepartmentController.getAllDepartment);

export const academicDepartmentRoutes = router;
