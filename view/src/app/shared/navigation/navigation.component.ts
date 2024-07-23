import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  loggedInUser: string | null;

  constructor(private authService: AuthService) {
    this.loggedInUser = this.authService.getUsername();
  }

}
