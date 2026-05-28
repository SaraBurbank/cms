import { Component } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref';

@Component({
  selector: 'cms-document-detail',
  imports: [RouterLink],
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail {
  document: Document | null = null;
  nativeWindow: any;
  id: string = '';
  
  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private windowService: WindRefService) {}

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id)
      }
    );
    this.nativeWindow = this.windowService.getNativeWindow()
  }
  onView() {
    if (this.document)
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    };
  }
  onDelete() {
    if(this.document)
    this.documentService.deleteDocument(this.document);
  }
}
