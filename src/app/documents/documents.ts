import { Component } from '@angular/core';
import { DocumentList } from './document-list/document-list';
import { Document } from './document.model';
import { DocumentService } from './document.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cms-documents',
  imports: [DocumentList, RouterOutlet],
  templateUrl: './documents.html',
  styleUrl: './documents.css',
  providers: [DocumentService]
})
export class Documents {
  selectedDocument: Document | null = null;
  constructor( private documentService: DocumentService ) {}
  
  ngOnInit() {
    this.documentService.documentSelectedEvent
      .subscribe((document: Document) => {
          this.selectedDocument = document
        }
      );
  }
}