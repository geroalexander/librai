export interface Book {
  id: string;
  author: string[];
  title: string;
  subtitle: string;
  description: string;
  pageCount: number;
  categories: string[];
  publisher: string;
  publishedDate: string;
  averageRating: number;
  ratingsCount: number;
  thumbnail: string;
  smallThumbnail: string;
  price: number;
  currency: string;
}
