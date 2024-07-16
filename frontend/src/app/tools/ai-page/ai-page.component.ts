import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-page',
  templateUrl: './ai-page.component.html',
  styleUrls: ['./ai-page.component.css']
})
export class AiPageComponent implements OnInit {
  messages: { sender: string, text: string }[] = [];
  userInput: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(): void {
    if (this.userInput.trim()) {
      this.messages.push({ sender: 'user', text: this.userInput });
      this.userInput = '';
      
      // Simulate AI response
      setTimeout(() => {
        this.messages.push({ sender: 'ai', text: 'This is an AI response.' });
      }, 1000);
    }
  }
}
