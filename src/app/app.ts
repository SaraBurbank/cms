import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header';
import { DocumentService } from './documents/document.service';
import { MessageService } from './messages/message.service';
import { ContactService } from './contacts/contact.service';

@Component({
  selector: 'cms-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  constructor(
    private contactService: ContactService,
    private documentService: DocumentService,
    private messageService: MessageService  
  ) {}

  ngOnInit() {
    this.contactService.getContacts();
    this.documentService.getDocuments();
    this.messageService.getMessages();
  }
 }
