import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path        : 'dashboards/dashboard1',
        loadChildren: () => import('./dashboards/dashboard1/dashboard1.module').then(m => m.Dashboard1Module)
    },
    {
        path        : 'mail',
        loadChildren: () => import('./mailbox/mailbox.module').then(m => m.MailboxModule)
    },
    {
        path        : 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    },
    {
        path        : 'faqs/faq',
        loadChildren: () => import('./faqs/faq/faq.module').then(m => m.FaqModule)
    },
    {
        path        : 'faqs/faq-v2',
        loadChildren: () => import('./faqs/faq-v2/faq-v2.module').then(m => m.FaqV2Module)
    },
    {
        path        : 'knowledge-base',
        loadChildren: () => import('./knowledge-base/knowledge-base.module').then(m => m.KnowledgeBaseModule)
    },
    {
        path        : 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    },
    {
        path        : 'contacts',
        loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
    },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: []
})
export class AppsModule { }
