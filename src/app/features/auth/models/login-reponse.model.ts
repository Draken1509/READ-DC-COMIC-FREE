import { ApplicationUser } from './../../comic/models/comicPaged.model';
export interface LoginResponse {
    email :string;
    token :string;
    roles :string[]
    jwtToken :string;
    applicationUserId :string;
  
}