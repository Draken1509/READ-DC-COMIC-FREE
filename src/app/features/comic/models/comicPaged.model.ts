import { Comic } from "./comic.model";

export interface ApplicationUser {
    comic: Comic[];
    totalItems: number;
  }