// export interface AddCommentRequest {    
//     content: string;
//     createAt:  Date;
//     parentCommentId: number | null;
//     applicationUserId? : string;
//     comicId: number;       
// }

import { ApplicationUser } from "src/app/features/comic/models/applicationUser.model";
import { Comment } from "./comment.model";



export interface AddCommentRequest {

    comicId: number | null;     
    content: string  | null;
    applicationUserId: string | null | undefined;
    parentCommentId: number | null;  
    replyUserName?: string;
    answer: number | null
    email?: string  | null;
    userName?: string  | null;

    applicationUser?: ApplicationUser | null 
  

}

