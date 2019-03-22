import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { MatButtonModule, MatMenuModule } from '@angular/material';

import { ButtonWithMenuModule } from '@codelab/utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeedbackService } from './feedback.service';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { FeedbackRatingComponent } from './feedback-rating/feedback-rating.component';
import { FeedbackIssueDropdownComponent } from '@codelab/feedback/src/lib/feedback-issue-dropdown/feedback-issue-dropdown.component';
import { HttpClientModule } from '@angular/common/http';
import { GithubModule } from '@codelab/utils';

import { environment } from '../../../../apps/codelab/src/environments/environment';

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    angularFire,
    FormsModule,
    AngularFireDatabaseModule,
    ButtonWithMenuModule,
    HttpClientModule,
    GithubModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [FeedbackService],
  declarations: [
    FeedbackWidgetComponent,
    FeedbackRatingComponent,
    FeedbackIssueDropdownComponent
  ],
  exports: [
    FeedbackWidgetComponent,
    FeedbackRatingComponent,
    ButtonWithMenuModule
  ]
})
export class FeedbackModule {
}
