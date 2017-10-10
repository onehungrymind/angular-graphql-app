
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Course } from './course.model';
import { CoursesService } from './courses.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

const BASE_URL = 'http://localhost:3000/students/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class StudentsService {
  constructor(private http: Http, private coursesService: CoursesService) {}

  all() {
    return this.http.get(BASE_URL)
      .map(res => res.json());
  }

  full() {
    return this.all()
      .switchMap(students => this.coursesService.all()
        .map(courses => students.map(student => this.transformStudent(student, courses)))
      );
  }

  load(id) {
    return this.http.get(`${BASE_URL}${id}`)
      .map(res => res.json());
  }

  create(student: Student) {
    return this.http.post(`${BASE_URL}`, JSON.stringify(student), HEADER)
      .map(res => res.json());
  }

  update(student: Student) {
    return this.http.put(`${BASE_URL}${student.id}`, JSON.stringify(student), HEADER)
      .map(res => res.json());
  }

  delete(student: Student) {
    return this.http.delete(`${BASE_URL}${student.id}`)
      .map(res => res.json());
  }

  private parseCourseIds(courses: Course[]) {
    return courses
      .filter(course => course.enrolled)
      .map(course => course.id);
  }

  private transformStudent(student: Student, allCourses: Course[]) {
    return Object.assign({}, student, { courses: this.buildCourses(student.courses, allCourses)});
  }

  private buildCourses(enrolledCourses: Course[], allCourses: Course[]) {
    return allCourses.map(course => {
      return Object.assign({}, course, {enrolled: this.isEnrolled(course, enrolledCourses)})
    })
  }

  private isEnrolled(course: Course, enrolledCourses) {
    return !!enrolledCourses.find(c => c === course.id);
  }
}
