import { Component, input, output } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-item',
  imports: [],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItem {
  contact = input.required<Contact>();
  contactSelected = output<Contact>();

  onSelected() {
    this.contactSelected.emit(this.contact());
  }
}