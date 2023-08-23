import express from 'express';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academicSemesters',
    routes: academicSemesterRoutes,
  },
  {
    path: '/academicFaculty',
    routes: academicFacultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
