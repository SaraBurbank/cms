import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentChangedEvent = new BehaviorSubject<Document[]>([]);
  private documents: Document[] = [];
  private documentsUrl = 'http://localhost:3000/documents';
  maxDocumentId: number = 0;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this._getMaxId();
  }
  getDocuments(): Document[] {
    if (this.documents.length === 0) {
      this.http.get<{ message: string; documents: Document[] }>(`${this.documentsUrl}`)
      .subscribe({
        next: (response) => {
          this.documents = response.documents ?? [];
          this.maxDocumentId = this._getMaxId();
          this.documents.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.documentChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
    return this.documents.slice();
  }
  getDocument(id: string): Document | null {
    const document = this.documents.find(d => d.id === id)
    return document ?? null;
  }
  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    this.http.put(`${this.documentsUrl}.json`, documentsString)
      .subscribe(() => {
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
  }
  addDocument(newDocument: Document):void {
    if (!newDocument) return;
    newDocument.id = "";
    const headers = { 'Content-Type': 'application/json' };
    this.http.post<{ message: string, document: Document }>(this.documentsUrl, newDocument, { headers })
      .subscribe((responseData) => {
        this.documents.push(responseData.document);
        this.storeDocuments();
      });
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;
    const pos = this.documents.indexOf(originalDocument);
    if ( pos < 0 ) return;
    newDocument.id = originalDocument.id;
    const headers = { 'Content-Type': 'application/json' };
    this.http.put(`${this.documentsUrl}/${originalDocument.id}`, newDocument, { headers })
      .subscribe((response: any) => {
        this.documents[pos] = newDocument;
        this.storeDocuments();
      });
  }
  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    const headers = { 'Content-Type': 'application/json' };
    this.http.delete(`${this.documentsUrl}/${document.id}`, { headers })
      .subscribe((response: any) => {
        this.documents.splice(pos, 1);
        this.storeDocuments();
      });
  }
  _getMaxId(): number {
    let maxId:number = 0;
    for (const document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) maxId = currentId;
    }
    return maxId;
  }
}
