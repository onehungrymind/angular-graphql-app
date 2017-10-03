import { Injectable } from '@angular/core';
import { Student } from './student.model';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import 'rxjs/add/operator/map';
import { Course } from './course.model';

const AllStudentsQuery = gql`
  query allStudents {
    allStudents {
      id
      firstName
      lastName
      active
      courses {
        id
        name
        description
        level
      }
    }
  }
`;

const CreateStudentMutation = gql`
  mutation($firstName: String!, $lastName: String!, $active: Boolean!, $coursesIds: [ID!]!) {
    createStudent (
      firstName: $firstName
      lastName: $lastName
      active: $active
      coursesIds: $coursesIds
  ) {
      id
      firstName
      lastName
      active
    }
  }
`;

const UpdateStudentMutation = gql`
  mutation($id:ID!, $firstName: String!, $lastName: String!, $active: Boolean!, $coursesIds: [ID!]!) {
    updateStudent (
      id: $id
      firstName: $firstName
      lastName: $lastName
      active: $active
      coursesIds: $coursesIds
  ) {
      id
      firstName
      lastName
      active
    }
  }
`;

const DeleteStudentMutation = gql`
  mutation($id:ID!) {
    deleteStudent (
      id: $id
    ) {
      id
      firstName
      lastName
      active
    }
  }
`;

interface QueryResponse {
  allStudents
}

@Injectable()
export class StudentsService {
  constructor(private apollo: Apollo) {
  }

  all() {
    return this.apollo.watchQuery<QueryResponse>({
        query: AllStudentsQuery
      })
      .map(({data}) => data.allStudents);
  }

  create(student: Student) {
    return this.apollo.mutate({
        mutation: CreateStudentMutation,
        variables: {
          firstName: student.firstName,
          lastName: student.lastName,
          active: student.active,
          coursesIds: this.parseCourseIds(student.courses)
        },
        refetchQueries: [{
          query: AllStudentsQuery
        }]
      });
  }

  update(student: Student) {
    return this.apollo.mutate({
        mutation: UpdateStudentMutation,
        variables: {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          active: student.active,
          coursesIds: this.parseCourseIds(student.courses)
        },
        refetchQueries: [{
          query: AllStudentsQuery
        }]
      });
  }

  delete(student: Student) {
    return this.apollo.mutate({
        mutation: DeleteStudentMutation,
        variables: {
          id: student.id
        },
        refetchQueries: [{
          query: AllStudentsQuery
        }]
      });
  }

  private parseCourseIds(courses: Course[]) {
    return courses
      .filter(course => course.enrolled)
      .map(course => course.id);
  }
}
