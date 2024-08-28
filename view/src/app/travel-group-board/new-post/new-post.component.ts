import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanTypeResponse} from "../../model/PlanTypeResponse";
import {Subscription} from "rxjs";
import {PostService} from "../../service/post.service";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit, OnDestroy{
  activePlanTypes: PlanTypeResponse[] = [];
  private planTypesSubscription: Subscription | undefined;

  form: FormGroup = new FormGroup({
    planTypeId: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl(''),
    plannedDateStart: new FormControl(''),
    plannedDateEnd: new FormControl(''),
    url: new FormControl('')
  });

  submitted = false;
  isSuccessful = false;
  isSubmitFailed = false;
  errorMessage = '';

  constructor(private postService: PostService, private router: Router) {
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
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    const {planTypeId, title, content, plannedDateStart, plannedDateEnd, url} = this.form.value;
    const groupId = parseInt(this.router.url.split('/')[2]);

    console.log({planTypeId, title, content, plannedDateStart, plannedDateEnd, url})

    this.postService.newPost({planTypeId, title, content, plannedDateStart, plannedDateEnd, url}, groupId).subscribe(
      {
        next: data => {
          this.isSuccessful = true;
          this.form.reset();
          this.postService.getPostsByGroupId(groupId);
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSuccessful = false;
        }
      }
    )

  }

  ngOnDestroy() {
    if(this.planTypesSubscription) {
      this.planTypesSubscription.unsubscribe();
    }
  }
}
