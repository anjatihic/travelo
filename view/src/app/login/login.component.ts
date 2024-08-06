import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  submitted = false;
  isSuccessful = false;
  isSignInFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }

  get f(): { [key: string]: AbstractControl} {
    return this.form.controls;
  }

  onLogin(): void {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    const {username, password} = this.form.value;

    this.authService.login({username, password}).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignInFailed = false;
        this.router.navigate(['/home']);
      }, error: err => {
        this.errorMessage = err.error.message;
        this.isSignInFailed = true;
      }
    })
  }


}
