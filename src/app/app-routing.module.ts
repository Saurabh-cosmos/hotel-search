import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelSearchComponent } from './ui-pages/hotel-search/hotel-search.component';
import { HotelListComponent } from './ui-pages/hotel-list/hotel-list.component';

const routes: Routes = [
  {
    path:'',
    component: HotelSearchComponent
  },
  {
    path:'availability',
    component: HotelListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
