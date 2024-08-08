import {Component, OnInit} from '@angular/core';
import {TravelGroupService} from "../service/travel-group.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-travel-group-board',
  templateUrl: './travel-group-board.component.html',
  styleUrl: './travel-group-board.component.css'
})
export class TravelGroupBoardComponent implements OnInit{
  groupId = '';

  constructor(private travelGroupService: TravelGroupService,
              private router: Router) {
  }
  ngOnInit() {
    this.groupId = this.router.url.split('/')[2];
  }

}
