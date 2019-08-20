import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LETTERS } from '../../common/common';

@Component({
  selector: 'slides-sync-poll-viewer-choice',
  templateUrl: './sync-poll-viewer-choice.component.html',
  styleUrls: ['./sync-poll-viewer-choice.component.css']
})
export class SyncPollViewerChoiceComponent {
  readonly LETTERS = LETTERS;
  @Input() myVote: string;
  @Input() answers: string[];
  @Output() vote = new EventEmitter<number | null>();


}