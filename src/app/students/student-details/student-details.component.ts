import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../shared/';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  originalName: string;
  selectedStudent: Student;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Input() set student(value: Student){
    if (value) { this.originalName = `${value.firstName} ${value.lastName}`; }
    this.selectedStudent = Object.assign({}, value);
  }
}
