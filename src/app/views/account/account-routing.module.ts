import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from './account.component';
import {JournalTypeComponent} from './journal/journal-type.component';
import {JournalComponent} from './journal/journal.component';
import {AccountSpendingComponent} from './spending/account-spending.component';



const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    data: {
      title: 'Account'
    },
  },
  {
    path: 'journal',
    component: JournalComponent,
    data: {
      title: 'Journal'
    },
  },
  {
    path: 'journal-type',
    component: JournalTypeComponent,
    data: {
      title: 'Journal Type'
    },
  },
  {
    path: 'account-spending',
    component: AccountSpendingComponent,
    data: {
      title: 'Account Spending'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
