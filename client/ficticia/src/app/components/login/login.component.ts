import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });} 
  admin: Admin = {
    username: '',
    password: ''
  }; 

  public isError = false;

  ngOnInit():void {}

  onLogin(): any {
    console.log(this.form.value);
    if (this.form.valid) {
      return this.authService
        .loginuser(this.form.value.email, this.form.value.password)
        .subscribe(
        data => {
          console.log(data);
          const token = data.access_token;
          this.authService.setToken(token);     
          this.isError = false;
          this.router.navigate(['/']);
        },
        error => this.onIsError()
        );
    } else {
      this.onIsError();
    }
  }

  onIsError():any{
    this.isError = true;
    return this.isError;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}

