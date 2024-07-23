import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation from "../utils/Validation";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    )
  }

  get f(): { [key: string]: AbstractControl} {
    return this.form.controls;
  }


  onSubmit(): void {
    this.submitted = true;

    if(this.form.invalid){
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));

    const {username, email, password} = this.form.value;

    this.authService.register({username, email, password}).subscribe({
      next: data => {
        console.log(data);
        this.authService.login({username, password}).subscribe({
          next: loginData => {
            console.log(loginData);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.router.navigate(['/home']);
          }
          }
        )
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }

  onReset(): void{
    this.submitted = false;
    this.form.reset();
  }

}
