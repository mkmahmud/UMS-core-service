import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// Get Singel Data
router.get('/:id', academicSemesterController.getDataById);

// Create Academic semester
router.post(
  '/',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(academicSemesterValidation.create),
  academicSemesterController.createAcademicSemester
);

// Delete Semester Data by Id
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.deleteSemesterById
);

// Update Academic semester
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(academicSemesterValidation.update),
  academicSemesterController.updateSemesterById
);

// Get All Semester Data
router.get('/', academicSemesterController.getAllSemester);

export const academicSemesterRoutes = router;
