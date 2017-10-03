import { Injectable } from '@angular/core';
import { Course } from './course.model';

@Injectable()
export class CoursesService {
  courses: Course[] = [
    { id: '1', name: 'Intro to HTML and CSS', description: 'Start somewhere', level: '100' },
    { id: '2', name: 'Functional JavaScript', description: 'Because FUN', level: '200' },
    { id: '3', name: 'Machine Learning', description: 'Learn machines', level: '300' }
  ];

  constructor() { }
}
