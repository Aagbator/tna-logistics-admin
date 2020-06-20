import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { MailsFakeDb } from './fake-db/mails';
import { ChatFakeDb } from './fake-db/chat';
import { FaqFakeDb } from './fake-db/faq';
import { KnowledgeBaseFakeDb } from './fake-db/knowledge-base';
import { ContactsFakeDb } from './fake-db/contacts';
import { CalendarFakeDb } from './fake-db/calendar';


@Injectable()
export class FakeApiService implements InMemoryDbService {
    constructor() {}

    createDb(): {} | Observable<{}> {
        return {

            // Mail
            'mail-mails'  : MailsFakeDb.mails,
            'mail-folders': MailsFakeDb.folders,
            'mail-filters': MailsFakeDb.filters,
            'mail-labels' : MailsFakeDb.labels,

            // Chat
            'chat-chats'   : ChatFakeDb.chats,
            'chat-users'    : ChatFakeDb.users,

            // FAQ
            'faq': FaqFakeDb.data,
            'categories': FaqFakeDb.categories,

            // Knowledge base
            'knowledge-base': KnowledgeBaseFakeDb.data,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user'    : ContactsFakeDb.user,

            // Calendar
            'calendar-events': CalendarFakeDb.events,

        };
    }
}
