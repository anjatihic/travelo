import {Component, OnInit} from '@angular/core';
import {TravelGroupService} from "../service/travel-group.service";

@Component({
  selector: 'app-travel-group-board',
  templateUrl: './travel-group-board.component.html',
  styleUrl: './travel-group-board.component.css'
})
export class TravelGroupBoardComponent implements OnInit{

  constructor(private travelGroupService: TravelGroupService) {
  }
  ngOnInit() {
  }

}
