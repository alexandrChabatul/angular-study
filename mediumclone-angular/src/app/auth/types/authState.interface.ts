import { BackedErrorsInterface } from "src/app/shared/types/backenErrors.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null;
  isLoggedIn: boolean | null;
  validationErrors: BackedErrorsInterface | null;
}
