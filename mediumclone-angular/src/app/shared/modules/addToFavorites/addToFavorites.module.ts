import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AddToFavoritesComponent } from './components/addToFavorites/addToFavorites.component';
import { AddToFavoriteService } from './services/addToFavorites.service';
import { AddToFavoritesEffect } from './store/effects/addToFavorites.effect';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  declarations: [AddToFavoritesComponent],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoriteService],
})
export class AddToFavoritesModule {}
