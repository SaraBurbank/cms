import { Component, output } from '@angular/core';
import { DocumentItem } from '../document-item/document-item';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  imports: [DocumentItem],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})

export class DocumentList {
  selectedDocumentEvent = output<Document>();

  documents: Document[] = [
    new Document('1', 'Class 1', 'This is an introductory class', 'url1', [] ),
    new Document('2', 'Class 2', 'This is a intermediate class', 'url2', [] ),
    new Document('3', 'Class 3', 'This is an advanced class', 'url3', [] ),
    new Document('4', 'Class 4', 'This is a specialized class', 'url4', [] )
  ];

  OnSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
