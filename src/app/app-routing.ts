import { Routes } from '@angular/router';
import { Contacts } from './contacts/contacts';
import { Documents } from './documents/documents';
import { MessageList } from './messages/message-list/message-list';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { ContactEdit } from './contacts/contact-edit/contact-edit';
import { ContactDetail } from './contacts/contact-detail/contact-detail';

export const appRoutes: Routes = [
    {path: '', component: Documents},
    {path: 'documents', component: Documents, children: [
        {path: 'new', component: DocumentEdit},
        {path: ':id', component: DocumentDetail},
        {path: ':id/edit', component: DocumentEdit}
    ]},
    {path: 'messages', component: MessageList},
    {path: 'contacts', component: Contacts, children: [
        {path: 'new', component: ContactEdit },
        {path: ':id', component: ContactDetail },
        {path: ':id/edit', component: ContactEdit },
    ]},
];
