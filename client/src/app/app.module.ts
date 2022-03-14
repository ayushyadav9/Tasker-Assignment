import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './MyComponents/Registration/login/login.component';
import { SignupComponent } from './MyComponents/Registration/signup/signup.component';
import { HomeComponent } from './MyComponents/Home/home.component';
import { TodoComponent } from './MyComponents/Home/todo/todo.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { PendingTodoComponent } from './MyComponents/Home/pending-todo/pending-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    TodoComponent,
    PendingTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
