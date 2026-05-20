import { Component, input } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contacts.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  imports: [],
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem {
  message = input.required<Message>();
  messageSender: string = '';
  constructor( private contactService: ContactService) {}
    ngOnInit() {
      const message = this.message();
      const contact: Contact | null = this.contactService.getContact(message.sender);
      this.messageSender = contact ? contact.name : 'Sara';
   }
}
