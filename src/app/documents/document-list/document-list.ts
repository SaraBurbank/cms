import { Component } from '@angular/core';
import { DocumentItem } from '../document-item/document-item';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { RouterLink, RouterLinkActive} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  imports: [DocumentItem, RouterLink, RouterLinkActive],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})

export class DocumentList {
  documents: Document[] = [];
  private subscription!: Subscription; 

  constructor(private documentService: DocumentService) {}
  
  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent
      .subscribe((documents: Document[]) => {
        this.documents = documents;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
