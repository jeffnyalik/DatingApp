import { Photo } from './../photo/photo';
export interface User {
    id: number,
    age?: number,
    username: string,
    gender: string,
    image?: string,
    created_at?: Date,
    known_as?: string,
    city?: string,
    language: string,
    last_active?: Date,
    bio?: string,
    interests?: string,
    looking_for?: string,
    name: string,
    caption?: string,
    photos?: string[],

}