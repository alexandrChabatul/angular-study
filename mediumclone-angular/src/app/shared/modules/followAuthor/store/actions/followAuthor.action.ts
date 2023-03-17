import { createAction, props } from '@ngrx/store';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';
import { ActionTypes } from '../actionTypes';

export const followAuthorAction = createAction(
  ActionTypes.FOLLOW_AUTHOR,
  props<{ isFollowed: boolean; slug: string }>()
);

export const followAuthorSuccessAction = createAction(
  ActionTypes.FOLLOW_AUTHOR_SUCCESS,
  props<{ profile: ProfileInterface }>()
);
export const followAuthorFailureAction = createAction(
  ActionTypes.FOLLOW_AUTHOR_FAILURE
);
export const followAuthorUnauthorizedAction = createAction(
  ActionTypes.FOLLOW_AUTHOR_UNAUTHORIZED
);
