import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'; // Import Router for navigation
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  posts: PostData[] = [];

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onCreatePostClick() {
    this.dialog.open(CreatePostComponent);
  }

  getPosts() {
    this.firestore.getCollection({
      path: ["Posts"],
      where: [
        new OrderBy("timestamp", "desc"),
        new Limit(10)
      ],
      onComplete: (result) => {
        result.docs.forEach(doc => {
          let post = <PostData>doc.data();
          post.postId = doc.id;
          this.posts.push(post);
        });
      },
      onFail: err => {
        console.error('Failed to fetch posts:', err);
      }
    });
  }

  navigateToAIPage() {
    this.router.navigate(['/ai-page']);
  }

  navigateToPollsPage() {
    this.router.navigate(['/polls-page']);
  }
}

export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl?: string;
  postId: string;
}
