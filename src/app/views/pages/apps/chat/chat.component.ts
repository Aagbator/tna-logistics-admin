import { Component, OnDestroy, OnInit, AfterViewInit, ViewEncapsulation, HostListener, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';

import { ChatService } from './chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

    chats: any[];
    users: any;
    selectedChat: any;
    dialog: any;
    contact: any;

    chatSearch: any;
    searchText: string;
    
    // certain properties to search
    ALLOWED_SEARCH_TARGETS = [
        'name', 'lastMessage'
    ];

    sidebar_hide_breakpoint: string = 'gt-sm';

    me = {
        id: 1,
    }

    @ViewChild("leftSidebar", { static: true })
    leftSidebar: MatSidenav;

    @ViewChild('replyForm')
    replyForm: NgForm;

    @ViewChild('replyInput')
    replyInput: ElementRef;

    @ViewChild('chatPS') 
    chatPS: PerfectScrollbarComponent;

    private _unsubscribeAll: Subject<any>;

    
    constructor(
        private _observableMedia: MediaObserver,
        private _chatService: ChatService
    ) {
        this.users = this._chatService.users;
        this.chats = this._chatService.chats;
        this.searchText = '';

        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this._chatService.onChatSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(chatData => {
                this.selectedChat = chatData;
                if(chatData)
                {
                    this.dialog = chatData.dialog;
                    this.contact = chatData.contact;
                    this.readyToReply();
                }
            });
    }

    ngAfterViewInit() {
        this._observableMedia.asObservable()
            .subscribe(() => {
                setTimeout(() => {
                    if(this.leftSidebar) {
                        if ( this._observableMedia.isActive( this.sidebar_hide_breakpoint ) ) {
                            this.leftSidebar.mode = 'side';
                            this.leftSidebar.toggle(true);
                        } else {
                            this.leftSidebar.mode = 'over';
                            this.leftSidebar.toggle(false);
                        }
                    }
                });
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getChat(user): void
    {
        this._chatService.getChat(user);

        if ( !this._observableMedia.isActive( this.sidebar_hide_breakpoint ) )
        {
            this.leftSidebar.toggle(false);
        }
    }

    shouldShowContactAvatar(message, i): boolean
    {
        return (
            message.who === this.contact.id &&
            this.isFirstMessageOfGroup(message, i)
        );
    }

    isFirstMessageOfGroup(message, i): boolean
    {
        return (i === 0 || this.dialog[i - 1] && this.dialog[i - 1].who !== message.who);
    }

    isLastMessageOfGroup(message, i): boolean
    {
        return (i === this.dialog.length - 1 || this.dialog[i + 1] && this.dialog[i + 1].who !== message.who);
    }


    /**
     * Send Message
     */
    sendMessage(event): void
    {
        event.preventDefault();

        if ( !this.replyForm.form.value.message )
        {
            return;
        }

        // Message
        const message = {
            who    : this.me.id,
            message: this.replyForm.form.value.message,
            time   : new Date().toISOString(),
        };

        // Add the message to the chat
        this.dialog.push(message);

        // Reset the reply form
        this.replyForm.reset();

        // Update the server
        this._chatService.updateDialog(this.selectedChat.chatId, this.dialog)
            .then(response => {
                this.readyToReply();
            });
    }

    /**
     * Ready to reply: 
     *   1. Focus to the reply input
     *   2. Scroll chat list to the bottom
     */
    readyToReply(): void
    {
        setTimeout(() => {
            this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    /**
     * Focus to the reply input
     */
    focusReplyInput(): void
    {
        setTimeout(() => {
            this.replyInput.nativeElement.focus();
        });
    }

    /**
     * Scroll chat list to the bottom
     */
    scrollToBottom(speed?: number): void
    {
        if( this.chatPS && this.chatPS.directiveRef ) {
            speed = speed || 100;
            setTimeout(() => {
                this.chatPS.directiveRef.scrollToBottom(0, 100);
            });
        }
    }


}
