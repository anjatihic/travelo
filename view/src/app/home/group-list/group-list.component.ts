import {Component, Input, OnInit} from '@angular/core';
import {TravelGroupService} from "../../service/travel-group.service";
import {TravelGroupResponse} from "../../model/TravelGroupResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit{

  @Input() travelGroups: TravelGroupResponse[] = [];

  constructor(private travelGroupService: TravelGroupService, private router: Router) {
  }

  ngOnInit() {
  }

  navigateToGroup(groupId: number) {
    this.router.navigate([`/travelGroup/${groupId}`]);
  }

}
