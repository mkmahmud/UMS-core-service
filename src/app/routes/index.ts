import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { StudentRoutes } from '../modules/student/student.route';

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
  {
    path: '/academicDepartment',
    routes: academicDepartmentRoutes,
  },
  {
    path: '/student',
    routes: StudentRoutes,
  },
  {
    path: '/faculty',
    routes: FacultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
