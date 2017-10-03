import { Course } from './course.model';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
  courses: Course[];
}
