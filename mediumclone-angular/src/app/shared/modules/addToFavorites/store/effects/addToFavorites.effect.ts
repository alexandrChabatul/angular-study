import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { AddToFavoriteService } from '../../services/addToFavorites.service';
import { addToFavoritesAction, addToFavoritesFailureAction, addToFavoritesSuccessAction, addToFavoritesUnauthorizedAction } from '../actions/addToFavorites.action';

@Injectable()
export class AddToFavoritesEffect {
  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorite(slug);
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({ article });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(addToFavoritesFailureAction());
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToFavoritesUnauthorizedAction),
        tap(() => {
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoriteService,
    private router: Router
  ) {}
}
