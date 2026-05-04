import { Component } from '@angular/core';
import { MessageItem } from '../message-item/message-item';
import { MessageEdit } from '../message-edit/message-edit';


@Component({
  selector: 'cms-message-list',
  imports: [MessageItem, MessageEdit],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {}
