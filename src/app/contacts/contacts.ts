import { Component } from '@angular/core';
import { ContactList } from './contact-list/contact-list';
import { Contact } from './contacts.model';
import { ContactService } from './contact.service';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'cms-contacts',
  imports: [ContactList, RouterOutlet],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
  providers: [ContactService]
})
export class Contacts {
  selectedContact: Contact | null = null; 
  constructor( private contactService: ContactService ) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent
      .subscribe((contact: Contact) => {
          this.selectedContact = contact
        }
      );
  }
}
