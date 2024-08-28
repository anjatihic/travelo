import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostResponse} from "../../model/PostResponse";
import {Subscription} from "rxjs";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit, OnDestroy{

  posts: PostResponse[] = [];
  private postsSubscription: Subscription | undefined;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.postsSubscription = this.postService.specificGroupPosts$.subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error subscribing to specific group posts:', error);
      }
    )
  }

  ngOnDestroy() {
    if(this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

}
