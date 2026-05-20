import { Component } from '@angular/core';
import { DocumentItem } from '../document-item/document-item';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  imports: [DocumentItem],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})

export class DocumentList {
  documents: Document[] = [];
  constructor(private documentService: DocumentService) {}
  
  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }
}
