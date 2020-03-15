import { Author } from "./Author";

export interface Book {
  objectId: string;
  title?: string;
  quantity: number;
  cover?: string;
  author: Author;
}
