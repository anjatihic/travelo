import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  todayDate = new Date()
  loggedInUser: string | null;

  constructor(private authService: AuthService) {
    this.loggedInUser = this.authService.getUsername();
  }
}
