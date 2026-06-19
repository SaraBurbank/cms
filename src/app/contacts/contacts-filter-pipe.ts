import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts.model';

@Pipe({
  name: 'contactsFilter',
  pure: false,
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[] = [];
    if (term && term.length > 0) {
          filteredContacts = contacts.filter(
            (contact:Contact) => contact.name.toLowerCase().includes(term)
          );
      }
    if (filteredContacts.length === 0){
        return contacts;
    }
      return filteredContacts;
  }
}
