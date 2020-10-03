import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string;
  success: string;
  form: HTMLFormElement;
  constructor(private userservice: UserService, private router: Router) {}
  login(event: Event) {
    event.preventDefault();
    this.form = <HTMLFormElement>event.target;
    this.readFormValues();
  }
  navigateToHomePage() {
    this.router.navigate(['']);
  }
  readFormValues() {
    let email = (<HTMLInputElement>this.form.elements.namedItem('email')).value;
    let password = (<HTMLInputElement>this.form.elements.namedItem('password'))
      .value;
    let credentials = {
      email,
      password,
    };

    console.log(credentials);
    this.userservice.login(credentials).subscribe({
      next: (result) => {
        console.log(result);
        this.success = result.message;
        this.error = undefined;
        this.navigateToHomePage();
      },
      error: (response: HttpErrorResponse) => {
        console.log(response.error);
        this.error = response.error.error.message;
        this.success = undefined;
      },
    });
  }
  ngOnInit(): void {}
}
