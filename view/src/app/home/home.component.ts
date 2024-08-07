import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {TravelGroupResponse} from "../model/TravelGroupResponse";
import {TravelGroupService} from "../service/travel-group.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  todayDate = new Date()
  loggedInUser: string | null;
  travelGroups: TravelGroupResponse[] = [];

  constructor(private authService: AuthService,
              private travelGroupService: TravelGroupService) {
    this.loggedInUser = this.authService.getUsername();
  }

  ngOnInit() {

    //add correct method
    this.travelGroupService.getAllUserGroups().subscribe(
      groups => this.travelGroups = groups)
  }
}
