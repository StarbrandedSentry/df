import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Message {
  message: string;
  sender: string;
}

const dialogflowURL =
  'https://asia-east2-sandbox69.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  messages: Message[] = [];
  input: string;
  sessionId = Math.random()
    .toString(10)
    .slice(-5);
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.messages.push({
    //   message: 'bobo ako',
    //   sender: 'me'
    // });
    // this.messages.push({
    //   message: 'totoo nga',
    //   sender: 'me'
    // });
    // this.messages.push({
    //   message: 'okay',
    //   sender: 'bot'
    // });
  }

  onSend() {
    console.log('fired');
    this.messages.push({
      message: this.input,
      sender: 'me'
    });

    this.http.post<any>(
      dialogflowURL,
      {
        sessionId: this.sessionId,
        queryInput: {
          text: {
            text: this.input,
            languageCode: 'en-US'
          }
        }
      }
    ).subscribe(res => {
      this.messages.push({
        message: res.fulfillmentText,
        sender: 'bot'
      });
      console.log(res);
      console.log(res.fulfillmentMessages[1].payload.fields.isComplete);
    });
    
    this.input = null;
  }
}
