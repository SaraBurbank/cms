import { Component } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  imports: [RouterLink],
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail {
  document: Document | null = null;
  id: string = '';
  
  constructor(private documentService: DocumentService , private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id)
      }
    );
  }
}
