
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../_model/message';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-members-messages',
  templateUrl: './members-messages.component.html',
  styleUrls: ['./members-messages.component.css']
})
export class MembersMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm:NgForm;
  @Input() messages:Message[]
  @Input() username:string;
  messageContent: string;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    
  }
  sendMessage(){
    this.messageService.sendMessage(this.username,this.messageContent).then(() =>{
      this.messageForm.reset();
    });
  }
  
}
