

// export interface Comment{
//     commentId: number,
//     content: string,
//     likeCount: number,
//     createAt: Date,
//     applicationUser: ApplicationUser,
//     applicationUserId: string,
//     parentComments: Comment,
//     replies: Comment[]
//     parentCommentId: number;
//     replyUserName: string;  
// }

import { ApplicationUser } from "../../comic/models/applicationUser.model";

export interface Comment {
    commentId: number;
    content: string;
    likeCount: number;
    createAt: Date;
    applicationUser ?: ApplicationUser | null;
    parentCommentId?: number | null;  
    replies: Comment[];
    replyUserName: string;
    userName?:string|null;
    email?: string | null
  }
  