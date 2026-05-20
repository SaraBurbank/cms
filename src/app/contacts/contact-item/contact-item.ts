import { Component, input } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  imports: [],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItem {
  contact = input.required<Contact>();
  constructor(private contactService: ContactService) {}

  onSelected() {
    this.contactService.contactSelectedEvent.emit(this.contact());
  }
}