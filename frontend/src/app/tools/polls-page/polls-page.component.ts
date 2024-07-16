import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-polls-page',
  templateUrl: './polls-page.component.html',
  styleUrls: ['./polls-page.component.css']
})
export class PollsPageComponent implements OnInit {
  polls: Poll[] = [
    {
      id: 1,
      question: 'What is your favorite color?',
      options: ['Red', 'Blue', 'Green', 'Yellow'],
      votes: {},
      voted: false
    },
    {
      id: 2,
      question: 'What is your favorite pet?',
      options: ['Dog', 'Cat', 'Bird', 'Fish'],
      votes: {},
      voted: false
    }
  ];

  selectedOptions: { [pollId: number]: string } = {};

  constructor() {}

  ngOnInit(): void {}

  vote(pollId: number, option: string): void {
    this.selectedOptions[pollId] = option;
  }

  submitVote(pollId: number): void {
    const selectedOption = this.selectedOptions[pollId];
    if (selectedOption) {
      const poll = this.polls.find(p => p.id === pollId);
      if (poll) {
        poll.votes[selectedOption] = (poll.votes[selectedOption] || 0) + 1;
        poll.voted = true;
      }
    }
  }

  getVotes(pollId: number, option: string): number {
    const poll = this.polls.find(p => p.id === pollId);
    return poll ? poll.votes[option] || 0 : 0;
  }
}

interface Poll {
  id: number;
  question: string;
  options: string[];
  votes: { [option: string]: number };
  voted: boolean;
}
