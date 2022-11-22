import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConneciton: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();
  
  constructor(private toastr: ToastrService) { }

  createHubConnection(user: User) {
    this.hubConneciton = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build()

    this.hubConneciton
      .start()
      .catch(error => console.log(error));

    this.hubConneciton.on('UserIsOnline', username => {
      this.toastr.info(username + ' has connected');
    })

    this.hubConneciton.on('UserIsOffline', username => {
      this.toastr.warning(username + ' has disconnected')
    })

    this.hubConneciton.on('GetOnlineUsers',(username:string[]) =>{
      this.onlineUsersSource.next(username);
    })
  }

  stopHubConnection(){
    this.hubConneciton.stop().catch(error => console.log(error));
  }
}
