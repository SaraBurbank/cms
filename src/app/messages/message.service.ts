import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new BehaviorSubject<Message[]>([]); 
  private messages: Message[] = [];
  private messagesUrl = 'https://cms-sburbank-default-rtdb.firebaseio.com/messages';
  maxMessageId = this._getMaxId();
  
  constructor(private http: HttpClient) {
    this.maxMessageId = this._getMaxId();
  }

  getMessages(): Message[] {
    if (this.messages.length === 0) {
      this.http.get<Message[]>(`${this.messagesUrl}.json`)
      .subscribe({
        next: (messages: Message[]) => {
          this.messages = messages ?? [];
          this.maxMessageId = this._getMaxId();
          this.messages.sort((a, b) => {
            if (a.sender < b.sender) return -1;
            if (a.sender > b.sender) return 1;
            return 0;
          });
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
    return this.messages.slice();
  }
  getMessage(id: string): Message | null {
    const message = this.messages.find(m => m.id === id)
    return message ?? null;
  }
  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    this.http.put(`${this.messagesUrl}.json`, messagesString)
      .subscribe(() => {
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }
  _getMaxId(): number {
    let maxId:number = 0;
    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) maxId = currentId;
    }
    return maxId;
  }
}
