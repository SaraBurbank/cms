import { Routes } from '@angular/router';
import { Contacts } from './contacts/contacts';

export const routes: Routes = [
    {path: '', redirectTo: '', pathMatch: 'full', component: Contacts},
];
