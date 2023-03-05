export interface CurrentUserInterface {
  id: number;
  email: string;
  createAt: string;
  updatedAt: string;
  username: string;
  bio: string | null;
  token: string;
  image: string | null;
}
