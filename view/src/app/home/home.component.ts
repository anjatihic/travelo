import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {TravelGroupResponse} from "../model/TravelGroupResponse";
import {TravelGroupService} from "../service/travel-group.service";
import {Subscription} from "rxjs";

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

  constructor(private authService: AuthService,
              private travelGroupService: TravelGroupService) {
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
