import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {TravelGroupResponse} from "../model/TravelGroupResponse";
import {TravelGroupService} from "../service/travel-group.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  todayDate = new Date()
  loggedInUser: string | null;
  travelGroups: TravelGroupResponse[] = [];
  private subscription: Subscription | undefined;

  groupCode = '';

  joinSuccessful = false;

  constructor(private authService: AuthService,
              private travelGroupService: TravelGroupService,
              private router: Router) {
    this.loggedInUser = this.authService.getUsername();
  }

  ngOnInit() {
    this.travelGroupService.loadTravelGroupsByUserId();
    this.subscription = this.travelGroupService.travelGroups$.subscribe(
      (groups) => {
        this.travelGroups = groups;
        console.log('Updated travel groups:', this.travelGroups);
      },
      (error) => {
        console.error('Error subscribing to travel groups:', error);
      }
    );
  }

  onJoinGroup() {
    if (this.groupCode) {
      this.travelGroupService.addUserToGroup(this.groupCode).subscribe({
        next: data => {
          this.joinSuccessful = true;
          this.router.navigate(['/travelGroup/' + data.id]);
        },
        error: err => {
          console.log(err.error.message);
        }
      });
    } else {
      console.error('No group code provided!');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
