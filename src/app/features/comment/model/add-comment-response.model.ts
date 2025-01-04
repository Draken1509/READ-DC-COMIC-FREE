import { ApplicationUser } from "src/app/features/comic/models/applicationUser.model";

export interface AddCommentResponse {  

    comicId: number | null;     
    commentId: number | null;
    content: string  | null;
    applicationUserId: string | null | undefined;
    parentCommentId: number | null;  
    replyUserName?: string;
    email: ApplicationUser | null
    
    
}

