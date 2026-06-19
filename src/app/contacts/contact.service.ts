import { Injectable } from '@angular/core';
import { Contact } from './contacts.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactChangedEvent = new BehaviorSubject<Contact[]>([]);
  private contacts: Contact[] = [];
  private contactsUrl = 'https://cms-sburbank-default-rtdb.firebaseio.com/contacts';
  maxContactId: number = 0;
  
  constructor(private http: HttpClient) {
    this.maxContactId = this._getMaxId();
  }
  getContacts(): Contact[] {
    if (this.contacts.length === 0) {
      this.http.get<Contact[]>(`${this.contactsUrl}.json`)
      .subscribe({
        next: (contacts: Contact[]) => {
          this.contacts = contacts ?? [];
          this.maxContactId = this._getMaxId();
          this.contacts.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.contactChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
    return this.contacts.slice();
  }
  getContact(id: string): Contact | null {
    const contact = this.contacts.find(c => c.id === id)
    return contact ?? null;
  }
  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    this.http.put(`${this.contactsUrl}.json`, contactsString)
      .subscribe(() => {
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }
  addContact(newContact: Contact):void {
    if (!newContact) return;
    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;
    const pos = this.contacts.indexOf(originalContact);
    if ( pos < 0 ) return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }
  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.storeContacts();
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