import { Component, OnInit } from '@angular/core';
import { Course, CoursesService } from '../shared';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  currentCourse: Course;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.getCourses();
    this.resetCurrentCourse();
  }

  resetCurrentCourse() {
    this.currentCourse = { id: null, name: '', description: '', level: '' };
  }

  selectCourse(course) {
    this.currentCourse = course;
  }

  cancel(course) {
    this.resetCurrentCourse();
  }

  getCourses() {
    this.courses = this.coursesService.courses;
  }

  saveCourse(course) {
    if (!course.id) {
      this.createCourse(course);
    } else {
      this.updateCourse(course);
    }
  }

  createCourse(course) {
  }

  updateCourse(course) {
  }

  deleteCourse(course) {
  }
}
