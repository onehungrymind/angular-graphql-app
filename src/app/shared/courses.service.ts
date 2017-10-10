
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Course } from './course.model';
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3000/courses/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class CoursesService {
  constructor(private http: Http) {}

  all() {
    return this.http.get(BASE_URL)
      .map(res => res.json());
  }

  load(id) {
    return this.http.get(`${BASE_URL}${id}`)
      .map(res => res.json());
  }

  create(course: Course) {
    return this.http.post(`${BASE_URL}`, JSON.stringify(course), HEADER)
      .map(res => res.json());
  }

  update(course: Course) {
    return this.http.put(`${BASE_URL}${course.id}`, JSON.stringify(course), HEADER)
      .map(res => res.json());
  }

  delete(course: Course) {
    return this.http.delete(`${BASE_URL}${course.id}`)
      .map(res => res.json());
  }
}
