import { Component } from '@angular/core';
import { ContactList } from './contact-list/contact-list';
import { ContactDetail } from './contact-detail/contact-detail';
import { Contact } from './contacts.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  imports: [ContactList, ContactDetail],
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
