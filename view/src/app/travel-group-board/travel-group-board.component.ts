import {Component, OnDestroy, OnInit} from '@angular/core';
import {TravelGroupService} from "../service/travel-group.service";
import {Router} from "@angular/router";
import {TravelGroupResponse} from "../model/TravelGroupResponse";
import {UserResponse} from "../model/UserResponse";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-travel-group-board',
  templateUrl: './travel-group-board.component.html',
  styleUrl: './travel-group-board.component.css'
})
export class TravelGroupBoardComponent implements OnInit, OnDestroy{

  groupId = '';
  loadedGroup: TravelGroupResponse | undefined;
  userDetails: UserResponse[] = [];
  private groupSubscription: Subscription | undefined;
  private usersSubscription: Subscription | undefined;
  newPostOpened = false;

  constructor(private travelGroupService: TravelGroupService,
              private router: Router) {
  }
  ngOnInit() {
    this.groupId = this.router.url.split('/')[2];


    this.groupSubscription = this.travelGroupService.getTravelGroupById(this.groupId).subscribe(travelGroup => {
      this.loadedGroup = travelGroup;


      if (this.loadedGroup && this.loadedGroup.usersIds) {
        this.loadUserDetails(this.loadedGroup.usersIds);
      }
    });
  }

  private loadUserDetails(userIds: number[]) {
    this.usersSubscription = this.travelGroupService.getUsersByIds(userIds).subscribe(users => {
      this.userDetails = users;
      console.log('Loaded user details:', this.userDetails);
    }, error => {
      console.error('Error fetching user details:', error);
    });
  }

  onNewPost() {
    this.newPostOpened = true;
  }

  onNewPostCancel() {
    this.newPostOpened = false;
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions to prevent memory leaks
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

}
