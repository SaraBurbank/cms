import { Injectable } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  maxContactId: number = 0;
  
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this._getMaxId();
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(id: string): Contact | null {
    const contact = this.contacts.find(c => c.id === id)
    return contact ?? null;
  }
  addContact(newContact: Contact):void {
      if (!newContact) return;
      this.maxContactId++
      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
  
      const contactsListClone = this.contacts.slice();
      this.contactChangedEvent.next(contactsListClone)
    }
    updateContact(originalContact: Contact, newContact: Contact) {
      if (!originalContact || !newContact) return;
      const pos = this.contacts.indexOf(originalContact);
      if ( pos < 0 ) return;
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
     
      const contactsListClone = this.contacts.slice();
      this.contactChangedEvent.next(contactsListClone)
    }
  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);
  }
  _getMaxId(): number {
    let maxId:number = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) maxId = currentId;
    }
    return maxId;
  }
}