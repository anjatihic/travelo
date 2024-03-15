import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'view';
  showNavigation: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd) {
        this.showNavigation = !(val.url == '/login' || val.url == '/register');
      }
    })
  }
}
