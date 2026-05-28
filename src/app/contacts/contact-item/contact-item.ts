import { Component, input } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'cms-contact-item',
  imports: [RouterLink],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItem {
  contact = input.required<Contact>();
  id = input.required<Document>();
  constructor(private contactService: ContactService) {}

  ngOnInit(){
    this.contactService.getContacts()
  }
}