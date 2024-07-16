import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CodeibleSocialMediaProject';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  private static userDocument: UserDocument | null = null;

  constructor(private loginSheet: MatBottomSheet,
      private router: Router
    ){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              // Handle when signed in
            },
            whenSignedOut: user => {
              AppComponent.userDocument = null;
            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["emailVerification"]);
            },
            whenSignedInAndEmailVerified: user => {
              this.getUserProfile();
            },
            whenChanged: user => {
              // Handle when changed
            }
          }
        );
      }
    );
  }

  public static getUserDocument(): UserDocument | null {
    return AppComponent.userDocument;
  }

  getUsername(): string | undefined {
    try {
      return AppComponent.userDocument?.publicName;
    } catch (err) {
      // Handle error if needed
    }
  }

  getUserProfile(): Promise<number> {
    return new Promise<number>(
      (resolved, rejected) => {
        const uid = this.auth.getAuth().currentUser?.uid;
        if (!uid) {
          resolved(0);
          return;
        }
        this.firestore.listenToDocument(
          {
            name: "Getting Document",
            path: ["Users", uid],
            onUpdate: (result) => {
              if (result.exists) {
                AppComponent.userDocument = <UserDocument>result.data();
                this.userHasProfile = result.exists; 
                AppComponent.userDocument.userId = uid;
                if(this.userHasProfile) {
                  this.router.navigate(["postfeed"]);
                  resolved(1);
                } else {
                  resolved(0);
                }
              } else {
                AppComponent.userDocument = null;
                resolved(0);
              }
            }
          }
        );
      }
    );
  }

  add(number1: number, number2: number): number {
    return number1 + number2;
  }

  onLogoutClick(): void {
    this.auth.signOut();
  }

  loggedIn(): boolean {
    return this.auth.isSignedIn();
  }

  onLoginClick(): void {
    this.loginSheet.open(AuthenticatorComponent);
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
}
