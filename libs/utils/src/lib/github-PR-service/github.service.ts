import { Injectable } from '@angular/core';
import { GitHub } from 'github-api';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class GithubService {
  repo = 'AngularNYC/angular-presentation';
  githubAuth;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase
  ) {
    afAuth.authState.subscribe(authData => {
      if (authData === null) {
        this.login();
      } else {
        this.githubAuth = authData;
      }
    });
  }

  async login() {
    const provider = new firebase.auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
  }

  async createIssue(message) {

    if (!this.githubAuth.credential) {
      await this.login();
    }

    const issueData = {
      title: message.comment.substring(0, 150),
      body: this.generateIssueBody(message)
    };
    const accessToken = this.githubAuth.credential.accessToken;

    const headers = {Authorization: 'token ' + accessToken};
    const options = {headers};
    this.http.post(
      `https://api.github.com/repos/${this.repo}/issues`,
      issueData,
      options
    ).subscribe((responseData: any) => {
      this.isDone(message);
      this.database
        .object(`feedback/${message.key}`)
        .update({url: responseData.html_url});
      window.open(responseData.html_url);
    });
  }

  async createClosedIssue(message, reason) {

    if (!this.githubAuth.credential) {
      await this.login();
    }

    const issueData = {
      title: reason + ' ' + message.comment.substring(0, 150),
      body: this.generateIssueBody(message)
    };
    const accessToken = this.githubAuth.credential.accessToken;

    const headers = {Authorization: 'token ' + accessToken};
    const options = {headers};
    this.http.post(
      `https://api.github.com/repos/${this.repo}/issues`,
      issueData,
      options
    ).subscribe(
      (responseData: any) => {
        console.log(responseData.html_url);
        this.database
          .object(`feedback/${message.key}`)
          .update({url: responseData.html_url});

        const changes = {state: 'closed'};
        const issueId = responseData.number;

        const headers = {Authorization: 'token ' + accessToken};
        const options = {headers};
        this.http.patch(
          `https://api.github.com/repos/${this.repo}/issues/${issueId}`,
          changes,
          options
        ).subscribe(res => {
            if (res) {
              this.isDone(message);
            }
          }
        );
      }
    );
  }


  generateIssueBody(message) {
    return `${message.comment}
Author: ${message.name}
Slide: [Local](http://localhost:4200${
      message.href
      }),[Public](https://angular-presentation.firebaseapp.com${message.href})`;
  }

  isDone(message) {
    this.database
      .object(`feedback/${message.key}`)
      .update({isDone: !message.isDone});
  }


}
