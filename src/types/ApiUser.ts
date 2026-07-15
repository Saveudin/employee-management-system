export interface ApiUser {
    id:number,
    name:string,
    email:string,
    company: {
        name:string
    }
}