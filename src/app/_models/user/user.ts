
export interface User {
    id: number,
    age?: number,
    username?: string,
    gender_name?: string,
    gender_id?: number,
    image?: string,
    created_at?: Date,
    dob?: Date,
    knownAs: string,
    city?: string,
    language?: string,
    last_active?: Date,
    bio: string,
    hobbies?: string,
    lookingFor?: string,
    country?: string,
    country_id?:number,
    name?: string,
    caption: string,
    photos: string[],

}