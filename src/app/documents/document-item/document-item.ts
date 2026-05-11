import { Component, input, output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  imports: [],
  templateUrl: './document-item.html',
  styleUrl: './document-item.css',
})
export class DocumentItem {
  document = input.required<Document>();
  documentSelected = output<Document>();

  onSelected() {
    this.documentSelected.emit(this.document());
  }
}
