import { Component, output } from '@angular/core';
import { Message } from '../message.model';
import { MessageItem } from '../message-item/message-item';
import { MessageEdit } from '../message-edit/message-edit';

@Component({
  selector: 'cms-message-list',
  imports: [MessageItem, MessageEdit],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  selectedMessageEvent = output<Message>();

  messages: Message[] = [
    new Message('1', 'Grading', 'this is a message about grading', 'Bro. Jackson'),
    new Message('2', 'Assignment Due', 'Could we talk about assignment 3 due dates?', 'Steve Johnson'),
    new Message('3', 'Class Cancelled', 'Class is being cancelled on Monday', 'Bro. Jackson')
  ];

  onAddMessage(message: Message) {
    console.log(message);
    this.messages.push(message);
  }
}
