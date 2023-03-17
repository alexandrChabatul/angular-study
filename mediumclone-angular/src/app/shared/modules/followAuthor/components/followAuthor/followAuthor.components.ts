import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import {
  followAuthorAction,
  followAuthorUnauthorizedAction,
} from '../../store/actions/followAuthor.action';

@Component({
  selector: 'mc-follow-author',
  templateUrl: './followAuthor.components.html',
})
export class FollowAuthorComponent implements OnInit, OnDestroy {
  @Input('isFollowed') isFollowedProps: boolean;
  @Input('profileSlug') profileSlugProps: string;

  isFollowed: boolean;
  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isFollowed = this.isFollowedProps;
    this.isLoggedInSubscription = this.store
      .pipe(select(isLoggedInSelector))
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  handleFollowClick() {
    if (!this.isLoggedIn) {
      this.store.dispatch(followAuthorUnauthorizedAction());
      return;
    }
    this.store.dispatch(
      followAuthorAction({
        isFollowed: this.isFollowed,
        slug: this.profileSlugProps,
      })
    );
    this.isFollowed = !this.isFollowed;
  }
}
