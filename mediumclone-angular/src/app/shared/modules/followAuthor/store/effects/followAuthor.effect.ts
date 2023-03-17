import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';
import { FollowAuthorService } from '../../services/addToFavorites.service';
import {
  followAuthorAction,
  followAuthorFailureAction,
  followAuthorSuccessAction,
  followAuthorUnauthorizedAction,
} from '../actions/followAuthor.action';

@Injectable()
export class FollowAuthorEffect {
  followAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followAuthorAction),
      switchMap(({ isFollowed, slug }) => {
        const article$ = isFollowed
          ? this.followAuthorService.unfollowAuthor(slug)
          : this.followAuthorService.followAuthor(slug);
        return article$.pipe(
          map((profile: ProfileInterface) => {
            return followAuthorSuccessAction({ profile });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(followAuthorFailureAction());
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(followAuthorUnauthorizedAction),
        tap(() => {
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private followAuthorService: FollowAuthorService,
    private router: Router
  ) {}
}
