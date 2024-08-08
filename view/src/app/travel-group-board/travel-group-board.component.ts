import {Component, OnInit} from '@angular/core';
import {TravelGroupService} from "../service/travel-group.service";
import {Router} from "@angular/router";
import {TravelGroupResponse} from "../model/TravelGroupResponse";

@Component({
  selector: 'app-travel-group-board',
  templateUrl: './travel-group-board.component.html',
  styleUrl: './travel-group-board.component.css'
})
export class TravelGroupBoardComponent implements OnInit{
  groupId = '';
  loadedGroup: TravelGroupResponse | undefined;
  newPostOpened = false;

  constructor(private travelGroupService: TravelGroupService,
              private router: Router) {
  }
  ngOnInit() {
    this.groupId = this.router.url.split('/')[2];

    this.travelGroupService.getTravelGroupById(this.groupId).subscribe( travelGroup =>  {
      this.loadedGroup = travelGroup;
    });
  }

  onNewPost() {
    this.newPostOpened = true;
  }

  onNewPostCancel() {
    this.newPostOpened = false;
  }

}
