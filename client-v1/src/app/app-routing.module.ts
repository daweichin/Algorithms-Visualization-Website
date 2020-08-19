import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SortComponent } from './pages/sort/sort.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { CryptoComponent } from './pages/crypto/crypto.component';

const routes: Routes = [
  { path: 'sort', component: SortComponent },
  { path: 'search', component: SearchComponent },
  { path: '', component: HomeComponent },
  { path: 'crypto', component: CryptoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
