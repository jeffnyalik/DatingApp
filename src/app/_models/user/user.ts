import { Photo } from './../photo/photo';
export interface User {
    id: number,
    age: number,
    username: string,
    gender: string,
    image: string,
    created_at: Date,
    knownAs: string,
    city: string,
    language: string,
    lastActive: Date,
    bio?: string,
    hobbies?: string,
    lookingFor?: string,
    photos? : Photo[]

}