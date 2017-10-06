import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../shared/courses.service';
import { StudentsService } from '../shared/students.service';
import { Course } from '../shared/course.model';
import { Student } from '../shared/student.model';
import { Subscription } from 'rxjs/Subscription';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit, OnDestroy {
  courses: Course[];
  students: Student[];
  courses$: Subscription;

  constructor(
    private apollo: Apollo,
    private coursesService: CoursesService,
    private studentsService: StudentsService) {
  }

  ngOnInit() {
    this.getCourses();
    this.getStudents();
  }

  initSubscription(subscription) {
    this.apollo.subscribe({
      query: gql`
      subscription {
        Course(filter: {mutation_in: [CREATED, UPDATED, DELETED]}) {
          node {
            id
            name
            description
          }
        }
      }`,
      variables: {}
    })
    .subscribe({
      next (data) {
        subscription.refetch();
      }
    })
    ;
  }

  getCourses() {
    this.courses$ = this.coursesService.all()
      .subscribe(courses => this.courses = courses);

    this.initSubscription(this.courses$);
  }

  getStudents() {
    this.studentsService.all()
      .subscribe(students => this.students = students);
  }

  ngOnDestroy() {
    this.courses$.unsubscribe();
  }
}
