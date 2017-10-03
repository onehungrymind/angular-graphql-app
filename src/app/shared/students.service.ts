import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable()
export class StudentsService {
  students: Student[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', active: false, courses: [] },
    { id: '2', firstName: 'Jane', lastName: 'Smith', active: true, courses: [] }
  ];

  constructor() { }
}
