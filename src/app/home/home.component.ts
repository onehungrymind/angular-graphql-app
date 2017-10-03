import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../shared/courses.service';
import { StudentsService } from '../shared/students.service';
import { Course } from '../shared/course.model';
import { Student } from '../shared/student.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  courses: Course[];
  students: Student[];

  constructor(private coursesService: CoursesService, private studentsService: StudentsService) {
  }

  ngOnInit() {
    this.getCourses();
    this.getStudents();
  }

  getCourses() {
    this.coursesService.all()
      .subscribe(courses => this.courses = courses);
  }

  getStudents() {
    this.studentsService.all()
      .subscribe(students => this.students = students);
  }
}
