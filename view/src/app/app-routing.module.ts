import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {NewGroupComponent} from "./new-group/new-group.component";
import {authGuard} from "./guard/auth.guard";
import {TravelGroupBoardComponent} from "./travel-group-board/travel-group-board.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'newGroup', component: NewGroupComponent, canActivate: [authGuard]},
  {path: 'travelGroup/:groupCode', component: TravelGroupBoardComponent, canActivate: [authGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
