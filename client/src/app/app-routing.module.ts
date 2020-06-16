import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainNavComponent } from './main-nav/main-nav.component';
import { SelectionsortComponent } from './pages/selectionsort/selectionsort.component';

const routes: Routes = [
  {path:"selectionsort", component: SelectionsortComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
