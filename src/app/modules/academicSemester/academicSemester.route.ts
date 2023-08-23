import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// Get Singel Data
router.get('/:id', academicSemesterController.getDataById);

// Create Academic semester
router.post(
  '/',
  validateRequest(academicSemesterValidation.create),
  academicSemesterController.createAcademicSemester
);

// Delete Semester Data by Id
router.delete('/', academicSemesterController.deleteSemesterById);

// Update Academic semester
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.update),
  academicSemesterController.updateSemesterById
);

// Get All Semester Data
router.delete('/:id', academicSemesterController.deleteSemesterById);

export const academicSemesterRoutes = router;
