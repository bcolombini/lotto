import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FaqComponent } from './faq/faq.component';
import { InvestorComponent } from './investor/investor.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'investor', component: InvestorComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    // { enableTracing: true }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
