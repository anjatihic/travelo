import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { NewGroupComponent } from './new-group/new-group.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { TravelGroupBoardComponent } from './travel-group-board/travel-group-board.component';
import { GroupListComponent } from './home/group-list/group-list.component';
import { PostComponent } from './travel-group-board/post/post.component';
import { NewPostComponent } from './travel-group-board/new-post/new-post.component';
import { CardBadgeComponent } from './travel-group-board/post/card-badge/card-badge.component';
import { CardLinkComponent } from './travel-group-board/post/card-link/card-link.component';
import { CommentsComponent } from './travel-group-board/post/comments/comments.component';
import { NewCommentComponent } from './travel-group-board/post/comments/new-comment/new-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    HomeComponent,
    NewGroupComponent,
    TravelGroupBoardComponent,
    GroupListComponent,
    PostComponent,
    NewPostComponent,
    CardBadgeComponent,
    CardLinkComponent,
    CommentsComponent,
    NewCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
