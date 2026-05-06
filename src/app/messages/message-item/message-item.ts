import { Component, input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  imports: [],
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem {
  message = input.required<Message>();
}
