import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import {
  addToFavoritesAction,
  addToFavoritesUnauthorizedAction,
} from '../../store/actions/addToFavorites.action';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
})
export class AddToFavoritesComponent implements OnInit, OnDestroy {
  @Input('isFavorited') isFavoritedProps: boolean;
  @Input('favoritesCount') favoritesCountProps: number;
  @Input('articleSlug') articleSlugProps: string;

  isFavorited: boolean;
  favoritesCount: number;
  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isFavorited = this.isFavoritedProps;
    this.favoritesCount = this.favoritesCountProps;
    this.isLoggedInSubscription = this.store
      .pipe(select(isLoggedInSelector))
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  handleLike() {
    if (!this.isLoggedIn) {
      this.store.dispatch(addToFavoritesUnauthorizedAction());
      return;
    }
    this.store.dispatch(
      addToFavoritesAction({
        isFavorited: this.isFavorited,
        slug: this.articleSlugProps,
      })
    );
    if (this.isFavorited) {
      this.favoritesCount -= 1;
    } else {
      this.favoritesCount += 1;
    }
    this.isFavorited = !this.isFavorited;
  }
}
