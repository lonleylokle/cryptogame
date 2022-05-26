import { Routes } from '@angular/router';

// Components
import {AccountComponent} from "./account/account.component";
import {ErrorComponent} from "./error/error.component";
import {HomeComponent} from "./home/home.component";
import {GameComponent} from "./game/game.component";
import {TransactionComponent} from "./transaction/transaction.component";

export const UiRoute: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full'},
  { path: 'money', component: TransactionComponent },
  { path: 'home', component: HomeComponent},
  { path: 'game', component: GameComponent},
  { path: 'account', component: AccountComponent},
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
