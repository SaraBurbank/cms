import { Component, input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-item',
  imports: [],
  templateUrl: './document-item.html',
  styleUrl: './document-item.css',
})
export class DocumentItem {
  document = input.required<Document>();
  constructor(private documentService: DocumentService) {}

  onSelected() {
    this.documentService.documentSelectedEvent.emit(this.document());
  }
}
