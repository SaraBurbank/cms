import { Component, input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'cms-document-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './document-item.html',
  styleUrl: './document-item.css',
})
export class DocumentItem {
  document = input.required<Document>();
  id = input.required<Document>();
  constructor(private documentService: DocumentService) {}

  ngOnInit(){
    this.documentService.getDocuments
  }
}
