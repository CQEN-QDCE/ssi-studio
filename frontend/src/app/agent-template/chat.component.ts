import * as _ from 'lodash';
import { ChangeDetectorRef, Component, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom, lastValueFrom, Subject, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { AgentConfig } from '../models/agent-config';
import { AgentTemplateService } from '../services/agent-template.service';
import { MyService } from '../services/my.service';
import { Data } from '@angular/router';
import { Conversation } from '../models/conversation';
import { ConversationMessage } from '../models/conversationMessage';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  conversations: Conversation[] = [];

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(private myService: MyService) { 
  }

  ngOnInit(): void {
    this.myService.getServerSentEvent('/api/v1/sse').subscribe((data2: any) => {
      let data = JSON.parse(data2.data);
//      let agent = data.agent;
//      let topic = data.topic;
      let payload = data.payload;
//      this.messages += 'Connection id: ' + payload.connection_id + '</br>';
//      this.messages += 'Message: ' + payload.content + '</br>';
      const conversation = this.findConversation(payload.connection_id);
      const message = new ConversationMessage();
      message.content = payload.content;
      conversation.messages.push(message);
      let conversations: Conversation[] = [];
      for (const conversation of this.conversations) {
        conversations.push(conversation);
      }
      this.conversations = conversations;
      console.log(data2)
    });
    let conversation1 = new Conversation();
    conversation1.connectionId = 'Martin St-Pierre';
    const message1 = new ConversationMessage();
    message1.content = 'Est-ce que je peux te poser une question?';
    conversation1.messages.push(message1);
    const message2 = new ConversationMessage();
    message2.content = 'Comment tu as fais pour faire fonctionner la message Aries?';
    message2.reply = true;
    conversation1.messages.push(message2);
    this.conversations.push(conversation1);
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private findConversation(connectionId: string): Conversation {
    for (const conversation of this.conversations) {
      if (conversation.connectionId === connectionId) return conversation;
    }
    const conversation = new Conversation();
    conversation.connectionId = connectionId;
    this.conversations.push(conversation);
    return conversation;
  }

}