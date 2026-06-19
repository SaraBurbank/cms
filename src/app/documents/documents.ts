import { Component } from '@angular/core';
import { DocumentList } from './document-list/document-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cms-documents',
  imports: [DocumentList, RouterOutlet],
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class Documents {}