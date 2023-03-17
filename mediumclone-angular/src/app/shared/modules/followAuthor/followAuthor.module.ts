import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { FollowAuthorComponent } from './components/followAuthor/followAuthor.components';
import { FollowAuthorService } from './services/addToFavorites.service';
import { FollowAuthorEffect } from './store/effects/followAuthor.effect';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([FollowAuthorEffect])],
  declarations: [FollowAuthorComponent],
  exports: [FollowAuthorComponent],
  providers: [FollowAuthorService]
})
export class FollowAuthorModule {}
