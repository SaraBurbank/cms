import { Component } from '@angular/core';
import { ContactList } from './contact-list/contact-list';
import { ContactService } from './contact.service';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'cms-contacts',
  imports: [ContactList, RouterOutlet],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
  providers: [ContactService]
})
export class Contacts {
  constructor() {}
  ngOnInit() {}
}
