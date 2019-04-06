import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Chat } from './chat';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();
  }

  public sendMessage(chat: Chat) {
    this.socket.emit('send:message', chat);
  }

  public userJoin(user: string) {
    this.socket.emit('user:join', user);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('send:message', (chat: Chat) => {
            observer.next(chat);
        });
    });
  }

  public getNewJoin = () => {
    return Observable.create((observer) => {
        this.socket.on('user:join', (user: string) => {
            observer.next(user);
        });
    });
  }

}
