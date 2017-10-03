import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { ApolloModule } from 'apollo-angular';
import { provideClient } from './shared/apollo.client';

import { CoursesService, NotificationsService, StudentsService } from './shared';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    StudentDetailsComponent,
    StudentsListComponent,
    CoursesComponent,
    CourseDetailsComponent,
    CoursesListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [
    CoursesService,
    NotificationsService,
    StudentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
