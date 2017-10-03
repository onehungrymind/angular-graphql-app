import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Student } from '../../shared/';
import { Course } from '../../shared/course.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnChanges {
  originalName: string;
  selectedStudent: Student;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() courses: Course[];

  @Input() set student(value: Student){
    if (value) { this.originalName = `${value.firstName} ${value.lastName}`; }
    this.selectedStudent = Object.assign({}, value);

    if (this.courses) {
      this.selectedStudent = this.transformStudent(this.selectedStudent, this.courses);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['courses'] && changes['courses'].currentValue) {
      this.selectedStudent = this.transformStudent(this.selectedStudent, changes['courses'].currentValue);
    }
  }

  transformStudent(student: Student, allCourses: Course[]) {
    return Object.assign({}, student, { courses: this.buildCourses(student.courses, allCourses)});
  }

  buildCourses(enrolledCourses: Course[], allCourses: Course[]) {
    return allCourses.map(course => {
      return Object.assign({}, course, {enrolled: this.isEnrolled(course, enrolledCourses)})
    })
  }

  isEnrolled(course: Course, enrolledCourses: Course[]) {
    return !!enrolledCourses.find(c => c.id === course.id);
  }
}
