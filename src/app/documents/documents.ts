import { Component } from '@angular/core';
import { DocumentList } from './document-list/document-list';
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
  constructor() {}
  
  ngOnInit() {}
}