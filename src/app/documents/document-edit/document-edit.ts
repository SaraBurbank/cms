import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  imports: [FormsModule],
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})
export class DocumentEdit {
  originalDocument: Document | null = null;
  document: Document | null = null;
  editMode: boolean = false;
  id: string = '';
  
  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id){
          this.editMode = false;
          return;
        } 
        this.originalDocument = this.documentService.getDocument(this.id);
        if (!this.originalDocument) return; 
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }
  onSubmit(form: NgForm) {    
    const value = form.value
    const newDocument = new Document(this.id, value.name, value.description, value.url, [])
    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else {
      this.documentService.addDocument(newDocument)
    } 
    this.router.navigate(['/documents']);
  }
  onCancel() {
    this.router.navigate(['/documents']);
  }
}
