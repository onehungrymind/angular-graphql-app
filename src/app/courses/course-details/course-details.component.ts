import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../shared';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  originalName: string;
  selectedCourse: Course;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set course(value: Course){
    if (value) { this.originalName = value.name; }
    this.selectedCourse = Object.assign({}, value);
  }
}
