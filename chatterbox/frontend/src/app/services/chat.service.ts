import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private apiUrl = 'http://localhost:5000/api/chats';

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:5000', {
      withCredentials: true
    });
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  sendMessage(sender: string, content: string): void {
    this.socket.emit('sendMessage', { sender, content });
  }

  onNewMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }

  emitTyping(sender: string): void {
    this.socket.emit('typing', sender);
  }

  onTyping(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('typing', (sender) => {
        observer.next(sender);
      });
    });
  }
}