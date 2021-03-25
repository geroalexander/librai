export interface PopularBook {
  id: string;
  authors: string[] | [];
  title: string;
  subtitle: string | null;
  description: string | null;
  pageCount: number | null;
  categories: string[] | [];
  publisher: string | null;
  publishedDate: string | null;
  averageRating: number | null;
  ratingsCount: number | null;
  thumbnail: string | null;
  smallThumbnail: string | null;
  price: number | null;
  currency: string | null;
  compatabilityScore: number | null;
}
