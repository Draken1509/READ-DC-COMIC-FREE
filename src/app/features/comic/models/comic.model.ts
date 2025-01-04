import { Series } from './series.model';
import { ComicCategory } from "./comicCategory.model";
import { Rating } from './rating.model';

import { Page } from './page.model';
import { Comment } from '../../comment/model/comment.model';



export interface Comic{
    id: number;
    description: string;
    name:string;  
    thumbnail:string;
    averageRating: number;
    ratings: Rating[];
    onSaleDate: Date;
    comicCategory: ComicCategory
    comments: Comment[];
    series: Series[]
    relatedComics: Series[]
    replyUserName: string;
    pages: Page[]    

}   