import { Component, output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  imports: [],
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css',
})
export class MessageEdit {
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;
  addMessageEvent = output<Message>();

  onSendMessage(subject: string, msgText: string) {
    let id = Math.random().toString();
    let currentSender = 'Max';

    let newMessage = new Message (id, subject, msgText, currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }
}
