import { Component, input } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-detail',
  imports: [],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css',
})
export class ContactDetail {
  contact = input.required<Contact>();
}
