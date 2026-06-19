import { Component } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactItem } from '../contact-item/contact-item';
import { ContactService } from '../contact.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ContactsFilterPipe } from '../contacts-filter-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cms-contact-list',
  imports: [ContactItem, RouterLink, RouterLinkActive, ContactsFilterPipe, FormsModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})

export class ContactList{
  contacts: Contact[] = [];
  term: string = '';
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }
  search(value: string) {
    this.term = value;
  }
}