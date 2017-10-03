import { Injectable } from '@angular/core';
import { Course } from './course.model';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import 'rxjs/add/operator/map';

const AllCoursesQuery = gql`
  query allCourses {
    allCourses {
      id
      name
      description
      level
    }
  }
`;

const CreateCourseMutation = gql`
  mutation($name: String!, $description: String!, $level: String!) {
    createCourse (
      name: $name
      description: $description
      level: $level
  ) {
      id
      name
      description
      level
    }
  }
`;

const UpdateCourseMutation = gql`
  mutation($id:ID!, $name: String!, $description: String!, $level: String!) {
    updateCourse (
      id: $id
      name: $name
      description: $description
      level: $level
  ) {
      id
      name
      description
      level
    }
  }
`;

const DeleteCourseMutation = gql`
  mutation($id:ID!) {
    deleteCourse (
      id: $id
    ) {
      id
      name
      description
      level
    }
  }
`;

interface QueryResponse {
  allCourses
}

@Injectable()
export class CoursesService {
  constructor(private apollo: Apollo) {
  }

  all() {
    return this.apollo.watchQuery<QueryResponse>({
        query: AllCoursesQuery
      })
      .map(({data}) => data.allCourses);
  }

  create(course: Course) {
    return this.apollo.mutate({
      mutation: CreateCourseMutation,
      variables: {
        name: course.name,
        description: course.description,
        level: course.level
      },
      refetchQueries: [{
        query: AllCoursesQuery
      }]
    });
  }

  update(course: Course) {
    return this.apollo.mutate({
      mutation: UpdateCourseMutation,
      variables: {
        id: course.id,
        name: course.name,
        description: course.description,
        level: course.level
      },
      refetchQueries: [{
        query: AllCoursesQuery
      }]
    });
  }

  delete(course: Course) {
    return this.apollo.mutate({
      mutation: DeleteCourseMutation,
      variables: {
        id: course.id
      },
      refetchQueries: [{
        query: AllCoursesQuery
      }]
    });
  }
}
