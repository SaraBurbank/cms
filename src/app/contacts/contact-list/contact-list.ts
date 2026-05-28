import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactItem } from '../contact-item/contact-item';
import { ContactService } from '../contact.service';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'cms-contact-list',
  imports: [ContactItem, RouterLink, RouterLinkActive],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})

export class ContactList implements OnInit{
  contacts: Contact[] = [];
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.contactChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });

    this.contacts = this.contactService.getContacts();
  }
}