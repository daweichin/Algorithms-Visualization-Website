import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MainNavComponent } from "./main-nav/main-nav.component";
import { SortingAlgorithmsComponent } from "./pages/sort/sort.component";
import { HomeComponent } from "./pages/home/home.component";
import { SearchComponent } from "./pages/search/search.component";

const routes: Routes = [
  { path: "sort", component: SortingAlgorithmsComponent },
  { path: "search", component: SearchComponent },
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
