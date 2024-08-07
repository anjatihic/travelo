import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TravelGroupService} from "../service/travel-group.service";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.css'
})
export class NewGroupComponent implements OnInit{
  imageUrl: string = '';

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    tripStart: new FormControl(''),
    tripEnd: new FormControl(''),
    description: new FormControl(''),
    coverImage: new FormControl('')
  });

  submitted = false;
  isSuccessful = false;
  isSubmitFailed = false;
  errorMessage = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private travelGroupService: TravelGroupService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        tripStart: ['', Validators.required],
        tripEnd: ['', Validators.required, Validators],
        description: [''],
        coverImage: ['']
      }
    )
  }

  get f(): { [key: string]: AbstractControl} {
    return this.form.controls
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    const {name, tripStart, tripEnd, description, coverImage} = this.form.value;

    this.travelGroupService.createNewTravelGroup({name, tripStart, tripEnd, description, coverImage}).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.router.navigate(['/travelGroup/' + data.code])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSubmitFailed = true;
      }
    })

    //call travel service
  }

  onUrlChange() {
    if(this.isValidUrl(this.imageUrl)) {
      console.log('Valid URL: ', this.imageUrl);
    }else {
      console.log('Invalid URL: ', this.imageUrl)
    }
  }

  isValidUrl(url: string): boolean {
    try{
      new URL(url)
      return true;
    } catch (_) {
      return false;
    }
  }
}
