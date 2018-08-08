import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {
  private socket: Promise<WebSocket>;

  constructor() {
    this.socket = new Promise((resolve, reject) => {
      const socket = new WebSocket('ws://malcoded.com/analytics');
      socket.onopen = () => {
        socket.send(JSON.stringify({ messageType: 'joinAdmin' }));
        resolve(socket);
      };
    });
  }

  usercount(): Observable<{}> {
    let observable = new Observable(observer => {
      this.socket.then(socket => {
        socket.onmessage = msg => {
          const message = JSON.parse(msg.data);
          if (message.messageType == 'usercount') {
            observer.next(message.payload);
          }
        };
      });
    });

    return observable;
  }

  // readings(): Observable<{}> {
  //   this.socket = io('https://malcoded.com/admin', { path: '/analytics', transports: ['websocket'] });
  //   let observable = new Observable(observer => {
  //     this.socket.on('connect', socket => {
  //       this.socket.on('reading', msg => {
  //         let arr = [];
  //         for (let key in msg) {
  //           arr.push({ id: key, value: msg[key] });
  //         }
  //         console.log(arr);
  //         observer.next(arr);
  //       });
  //     });
  //   });
}
