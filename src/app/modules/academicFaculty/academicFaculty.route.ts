import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// Get Singel Faculty Data
router.get('/:id', academicFacultyController.getFacultyDataById);

// Create Academic Faculty
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(academicFacultyValidation.create),
  academicFacultyController.createAcademicFaculty
);

// Delete Faculty Data by Id
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicFacultyController.deleteFacultyById
);

// Update Academic Faculty
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(academicFacultyValidation.update),
  academicFacultyController.updateFacultyById
);

// Get All Faculty Data
router.get('/', academicFacultyController.getAllFaculty);

export const academicFacultyRoutes = router;
