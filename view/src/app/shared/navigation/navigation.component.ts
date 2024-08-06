import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  loggedInUser: string | null;

  constructor(private authService: AuthService, private router: Router) {
    this.loggedInUser = this.authService.getUsername();
  }

  onLogout() {
    this.authService.logout();
    this.loggedInUser = null;
    this.router.navigate(['login']);
  }

}
