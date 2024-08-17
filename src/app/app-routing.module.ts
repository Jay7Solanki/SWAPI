import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListingScreenComponent } from './character-listing-screen/character-listing-screen.component';
import { CharacterDetailScreenComponent } from './character-detail-screen/character-detail-screen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'character-list',
    pathMatch: 'full'
  },
  {
    path: 'character-list',
    component: CharacterListingScreenComponent
  },
  {
    path: 'characters/:id',
    component: CharacterDetailScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
