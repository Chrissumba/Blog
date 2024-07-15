import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { HomeComponent } from './pages/home/home.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { AiPageComponent } from './tools/ai-page/ai-page.component';
import { PollsPageComponent } from './tools/polls-page/polls-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "emailVerification", component: EmailVerificationComponent },
  { path: "postfeed", component: PostFeedComponent },
  { path: "ai-page", component: AiPageComponent }, // Route for AI Page
  { path: "polls-page", component: PollsPageComponent }, // Route for Polls Page
  { path: "**", component: HomeComponent } // Default route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
