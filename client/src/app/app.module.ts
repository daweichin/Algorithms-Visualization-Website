import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";

// material modules
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSliderModule,
} from "@angular/material";
import { AppRoutingModule } from "./app-routing.module";
import { SortingAlgorithmsComponent } from "./pages/sort/sort.component";
import { SearchComponent } from "./pages/search/search.component";
import { HomeComponent } from "./pages/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    SortingAlgorithmsComponent,
    SearchComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSliderModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
