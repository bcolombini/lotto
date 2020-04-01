import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { InvestorComponent } from './investor/investor.component';
import { FaqComponent } from './faq/faq.component';
import { CartComponent } from './cart/cart.component';
import { BannerComponent } from './banner/banner.component';
import { LastgameComponent } from './lastgame/lastgame.component';
import { AddZeroPipe } from './add-zero.pipe';
import { MarkOnlyNumberPipe } from './mark-only-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    InvestorComponent,
    FaqComponent,
    CartComponent,
    BannerComponent,
    LastgameComponent,
    AddZeroPipe,
    MarkOnlyNumberPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
