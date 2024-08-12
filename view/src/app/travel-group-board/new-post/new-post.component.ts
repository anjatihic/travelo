import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanTypeResponse} from "../../model/PlanTypeResponse";
import {Subscription} from "rxjs";
import {PostService} from "../../service/post.service";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit, OnDestroy{
  activePlanTypes: PlanTypeResponse[] = [];
  private planTypesSubscription: Subscription | undefined;

  form: FormGroup = new FormGroup({
    planType: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl(''),
    plannedStart: new FormControl(''),
    plannedEnd: new FormControl(''),
    url: new FormControl('')
  });

  submitted = false;
  isSuccessful = false;
  isSubmitFailed = false;
  errorMessage = '';

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.postService.loadActivePlanTypes();
    this.planTypesSubscription = this.postService.activePlanTypes$.subscribe(
      (planTypes) => {
        this.activePlanTypes = planTypes;
        console.log('Loaded plan types: ', this.activePlanTypes);
      },
      (error) => {
        console.error('Error subscribing to active plan types:', error);
      }
    )
  }

  get f(): { [key: string]: AbstractControl} {
    return this.form.controls;
  }

  onPost() {

  }

  ngOnDestroy() {
    if(this.planTypesSubscription) {
      this.planTypesSubscription.unsubscribe();
    }
  }
}
