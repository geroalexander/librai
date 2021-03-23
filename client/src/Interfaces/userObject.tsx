import { Book } from './bookObject';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string | null;
  favoriteGenres: string[] | [];
  books?: Book[] | null;
}
