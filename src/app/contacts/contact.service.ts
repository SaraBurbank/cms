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
  private contactsUrl = 'http://localhost:3000/contacts';
  maxContactId: number = 0;
  
  constructor(private http: HttpClient) {
    this.maxContactId = this._getMaxId();
  }
  getContacts(): Contact[] {
    if (this.contacts.length === 0) {
  this.http.get<{ message: string; contacts: Contact[] }>(`${this.contactsUrl}`)
      .subscribe({
        next: (response) => {
          this.contacts = response.contacts ?? [];
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
    newContact.id = "";
    const headers = { 'Content-Type': 'application/json' };
        this.http.post<{ message: string, contact: Contact }>(this.contactsUrl, newContact, { headers })
          .subscribe((responseData) => {
            this.contacts.push(responseData.contact);
            this.storeContacts();
          });
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;
    const pos = this.contacts.indexOf(originalContact);
    if ( pos < 0 ) return;
    newContact.id = originalContact.id;
    const headers = { 'Content-Type': 'application/json' };
    this.http.put(`${this.contactsUrl}/${originalContact.id}`, newContact, { headers })
      .subscribe((response: any) => {
        this.contacts[pos] = newContact;
        this.storeContacts();
      });
  }
  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    const headers = { 'Content-Type': 'application/json' };
    this.http.delete(`${this.contactsUrl}/${contact.id}`, { headers })
      .subscribe((response: any) => {
        this.contacts.splice(pos, 1);
        this.storeContacts();
      });
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