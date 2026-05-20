import { Injectable, EventEmitter} from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>(); 
  
  private contacts: Contact[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(id: string): Contact | null {
    const contact = this.contacts.find(c => c.id === id)
    return contact ?? null;
  }
}
