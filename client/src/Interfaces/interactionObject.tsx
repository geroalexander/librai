export interface Interaction {
  userId: string;
  bookId: string;
  isSaved: boolean;
  rating: number | null;
  compatabilityScore: number | null;
}
