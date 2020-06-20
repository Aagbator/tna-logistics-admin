import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    contacts: any[];
    chats: any[];
    users: any;
    onChatSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;

    constructor(
        private _httpClient: HttpClient
    ) { 
        this.onChatSelected = new BehaviorSubject(null);
        this.onChatsUpdated = new Subject();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getChats(),
                this.getUsers()
            ]).then(
                ([chats, users]) => {
                    this.chats = chats;
                    this.users = users;
                    resolve();
                },
                reject
            );
        });
    }

    
    /**
     * Get chats
     */
    getChats(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-chats')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get users
     */
    getUsers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-users')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get chat item
     */
    getChat(user): Promise<any>
    {
        const chatItem = this.users.find((item) => {
            return item.chatId === user.chatId;
        });

        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-chats/' + user.chatId)
                .subscribe((response: any) => {
                    const chat = response;

                    const chatData = {
                        chatId : chat.id,
                        dialog : chat.dialog,
                        contact: user
                    };

                    this.onChatSelected.next({...chatData});

                }, reject);

        });

    }

    /**
     * Update the chat dialog
     */
    updateDialog(chatId, dialog): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const newData = {
                id    : chatId,
                dialog: dialog
            };

            this._httpClient.post('api/chat-chats/' + chatId, newData)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }

}
