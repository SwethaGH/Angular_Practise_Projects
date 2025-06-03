// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'frontend';
// }
// src/app/app.component.ts
// import { Component, OnInit } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="chat-container">
//       <h1 class="text-3xl font-bold text-center mb-4">ChatterBox</h1>
//       <div class="chat-messages">
//         <div *ngFor="let msg of messages" class="message" [ngClass]="{'self': msg.sender === sender}">
//           <span class="sender">{{ msg.sender }}:</span> {{ msg.content }}
//           <span class="timestamp">{{ msg.timestamp | date:'shortTime' }}</span>
//         </div>
//       </div>
//       <div class="typing-indicator" *ngIf="typingUser && typingUser !== sender">
//         {{ typingUser }} is typing...
//       </div>
//       <div class="chat-input">
//         <input
//           type="text"
//           [(ngModel)]="message"
//           (keydown)="onTyping()"
//           (keydown.enter)="sendMessage()"
//           placeholder="Type your message..."
//           class="input"
//         />
//         <button (click)="sendMessage()" class="send-btn">Send</button>
//       </div>
//     </div>
//   `,
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   socket!: Socket;
//   messages: any[] = [];
//   message: string = '';
//   sender: string = 'User' + Math.floor(Math.random() * 1000);
//   typingUser: string | null = null;

//   ngOnInit(): void {
//     // Make sure this matches your backend's port and namespace (if any)
//     this.socket = io('http://localhost:5000/api/chats'); // Assuming default namespace and port 5000

//     this.socket.on('connect', () => {
//       console.log('Frontend: Socket connected!'); // LOG A: Confirm frontend connection
//     });

//     this.socket.on('disconnect', () => {
//       console.log('Frontend: Socket disconnected!'); // LOG B: Confirm frontend disconnection
//     });

//     // Listen for new messages
//     this.socket.on('newMessage', (message) => { // *** VERIFY THIS 'newMessage' STRING EXACTLY MATCHES BACKEND ***
//       console.log('Frontend: Received newMessage event:', message); // LOG C: Did we get the message event?
//       if (message && typeof message.sender === 'string' && typeof message.content === 'string') {
//         this.messages.push(message);
//         console.log('Frontend: Messages array after push:', this.messages); // LOG D: Is the array updated?
//       } else {
//         console.error('Frontend: Received malformed message:', message); // LOG E: Is the data structure wrong?
//       }
//     });

//     // Listen for typing events
//     this.socket.on('typing', (sender) => { // *** VERIFY THIS 'typing' STRING EXACTLY MATCHES BACKEND ***
//       console.log('Frontend: Received typing event from:', sender); // LOG F: Did we get the typing event?
//       if (sender && typeof sender === 'string') {
//         this.typingUser = sender;
//         setTimeout(() => {
//           this.typingUser = null;
//           console.log('Frontend: Typing indicator cleared.'); // LOG G: Did typing clear?
//         }, 2000);
//       } else {
//         console.error('Frontend: Received malformed typing sender:', sender); // LOG H: Is the data structure wrong?
//       }
//     });
//   }

//   sendMessage(): void {
//     if (this.message.trim()) {
//       const msgToSend = { // Renamed to avoid conflict
//         sender: this.sender,
//         content: this.message,
//         timestamp: new Date().toISOString() // Send ISO string for consistency
//       };
//       console.log('Frontend: Emitting sendMessage:', msgToSend); // LOG I: What frontend is sending
//       this.socket.emit('sendMessage', msgToSend); // *** VERIFY THIS 'sendMessage' STRING EXACTLY MATCHES BACKEND ***
//       this.message = '';
//     }
//   }

//   onTyping(): void {
//     console.log('Frontend: Emitting typing from:', this.sender); // LOG J: What frontend is sending
//     this.socket.emit('typing', this.sender); // *** VERIFY THIS 'typing' STRING EXACTLY MATCHES BACKEND ***
//   }
// }

import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  template: `
    <div class="chat-container">
      <h1 class="text-3xl font-bold text-center mb-4">ChatterBox</h1>

      <div class="user-name-container" *ngIf="!usernameSet">
        <input
          type="text"
          [(ngModel)]="tempUsername"
          placeholder="Enter your name..."
          (keydown.enter)="setUsername()"
          class="input"
        />
        <button (click)="setUsername()" class="send-btn">Set Name</button>
      </div>

      <div class="chat-area" *ngIf="usernameSet">
        <div class="chat-messages" #chatMessages>

          <div *ngFor="let msg of messages" class="message"
            [ngClass]="{
              'self': msg.sender === username,
              'system-message': msg.sender === 'System Announcement' || msg.sender === 'ChatBot',
              'other-user': msg.sender !== username && msg.sender !== 'System Announcement' && msg.sender !== 'ChatBot'
            }">
          <span class="sender">{{ msg.sender }}:</span> {{ msg.content }}
          <span class="timestamp">{{ msg.timestamp | date:'shortTime' }}</span>
        </div>
          <div class="end-of-messages"></div>
        </div>
        <div class="typing-indicator" *ngIf="typingUser && typingUser !== username">
          {{ typingUser }} is typing...
        </div>
        <div class="chat-input">
          <input
            type="text"
            [(ngModel)]="message"
            (keydown)="onTyping()"
            (keydown.enter)="sendMessage()"
            placeholder="Type your message..."
            class="input"
          />
          <button (click)="sendMessage()" class="send-btn">Send</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Your existing CSS (as provided in your first question) */
    .chat-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      min-height: 100vh;
      background-color: #f3f4f6; /* Tailwind's bg-gray-100 */
    }

    .user-name-container {
        display: flex;
        margin-bottom: 1rem;
        width: 100%;
        max-width: 32rem;
    }

    .user-name-container .input {
        flex: 1;
        margin-right: 0.5rem;
    }

    .chat-area {
        width: 100%;
        max-width: 32rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .chat-messages {
      width: 100%;
      max-width: 32rem;
      height: 24rem;
      overflow-y: auto;
      border: 1px solid #d1d5db; /* Tailwind's border-gray-300 */
      border-radius: 0.5rem;
      padding: 1rem;
      background-color: #ffffff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      margin-bottom: 0.5rem; /* Added margin for space */
      display: flex; /* Make it a flex container */
      flex-direction: column; /* Stack messages vertically */
    }

    .message {
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: #e5e7eb; /* Tailwind's bg-gray-200 */
      max-width: 80%; /* Limit message width */
    }

    .message.self {
      background-color: #3b82f6; /* Tailwind's bg-blue-500 */
      color: #ffffff;
      margin-left: auto; /* Push self messages to the right */
      margin-right: 0;
    }

    .sender {
      font-weight: 600;
    }

    .timestamp {
      font-size: 0.75rem;
      color: #6b7280; /* Tailwind's text-gray-500 */
      margin-left: 0.5rem;
    }

    .message.self .timestamp {
        color: #e0e7ff; /* Lighter color for self messages */
    }

    .typing-indicator {
      font-size: 0.875rem;
      color: #4b5563; /* Tailwind's text-gray-600 */
      font-style: italic;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem; /* Added margin for space */
    }

    .chat-input {
      display: flex;
      width: 100%;
      max-width: 32rem;
      margin-top: 1rem;
    }

    .input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #d1d5db; /* Tailwind's border-gray-300 */
      border-radius: 0.5rem;
      outline: none;
      transition: box-shadow 0.2s;
    }

    .input:focus {
      box-shadow: 0 0 0 2px #3b82f6; /* Tailwind's ring-blue-500 */
    }

    .send-btn {
      margin-left: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #3b82f6; /* Tailwind's bg-blue-500 */
      color: #ffffff;
      border-radius: 0.5rem;
      border: none; /* Ensure no default button border */
      cursor: pointer; /* Indicate clickable */
      transition: background-color 0.2s;
    }

    .send-btn:hover {
      background-color: #2563eb; /* Tailwind's bg-blue-600 */
    }
      /* Existing .message and .message.self styles */

.message.system-message {
  background-color: #d1ecf1; /* Light blue background */
  color: #0c5460; /* Dark blue text */
  text-align: center;
  font-weight: bold;
  border: 1px solid #bee5eb;
  margin-left: auto; /* Center it */
  margin-right: auto; /* Center it */
  max-width: 90%; /* Allow wider for announcements */
}

.message.system-message .sender,
.message.system-message .timestamp {
    color: #0c5460; /* Ensure sender/timestamp are also dark blue */
}

/* Optional: for other users, if you only have self and system messages so far */
.message.other-user {
    /* Styles for regular messages from others, if needed */
    background-color: #e5e7eb; /* Default light gray */
    color: #333;
}
  `]
})
export class AppComponent implements OnInit {
  socket!: Socket;
  messages: any[] = [];
  message: string = '';
  username: string = ''; // The actual username to be used
  tempUsername: string = ''; // Temporary model for the input field
  usernameSet: boolean = false; // Flag to control UI visibility
  typingUser: string | null = null;
  private typingTimeout: any;

  ngOnInit(): void {
    // We will connect to Socket.IO only once the username is set.
    // Initial connection logic will move to setUsername()
  }

  setUsername(): void {
    if (this.tempUsername.trim()) {
      this.username = this.tempUsername.trim();
      this.usernameSet = true;
      console.log(`[Frontend] Username set to: ${this.username}`);
      this.connectSocket(); // Connect to socket after setting username
    }
  }

  private connectSocket(): void {
    this.socket = io('http://localhost:5000'); // Ensure this matches your backend's URL and port

    this.socket.on('connect', () => {
      console.log('[Frontend] Connected to Socket.IO server!');
      // Emit a 'userJoined' event so the backend knows who connected (optional)
      this.socket.emit('userJoined', this.username);
    });

    this.socket.on('disconnect', () => {
      console.log('[Frontend] Disconnected from Socket.IO server.');
    });

    this.socket.on('newMessage', (message) => {
      console.log('[Frontend] Received newMessage:', message);
      this.messages.push(message);
      this.scrollToBottom();
    });

    this.socket.on('typing', (sender) => {
      if (sender !== this.username) { // Use 'username' instead of 'sender'
        this.typingUser = sender;
        if (this.typingTimeout) {
          clearTimeout(this.typingTimeout);
        }
        this.typingTimeout = setTimeout(() => {
          this.typingUser = null;
          this.typingTimeout = null;
        }, 2000);
      }
    });

    // Optional: Listen for initial messages if you want to load chat history
    this.socket.on('initialMessages', (initialMessages: any[]) => {
      console.log('[Frontend] Received initial messages:', initialMessages);
      this.messages = initialMessages;
      this.scrollToBottom();
    });
  }


  sendMessage(): void {
    if (this.message.trim() && this.usernameSet) { // Ensure username is set
      const messageData = {
        sender: this.username, // Send the user's chosen name
        content: this.message,
      };
      this.socket.emit('sendMessage', messageData);
      this.message = '';
      console.log('[Frontend] Sent sendMessage:', messageData);
    }
  }

  onTyping(): void {
    if (this.message.trim().length > 0 && this.usernameSet) { // Ensure username is set
      this.socket.emit('typing', this.username); // Emit user's chosen name for typing
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const chatMessagesElement = document.querySelector('.chat-messages');
      if (chatMessagesElement) {
        chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
      }
    }, 0);
  }
}
// export class AppComponent {}