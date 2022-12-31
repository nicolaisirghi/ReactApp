export type PostType ={
    id:number
    message:string
    likesCount:number
}
export type PhotosType = {
    small:string|null
    large:string|null
}
export type ContactType = {
    github:string
    vk:string
    facebook:string
    instagram:string
    twitter:string
    website:string
    youtube:string
    mainLink:string

}
export type ProfileType = {
    userId:number
    lookingForAJob:boolean
    lookingForAJobDescription:string
    fullName:string
    contacts:ContactType
    photos:ProfileType

}
export type userType = {

    id:number
    name:string
    status:string
    photos:PhotosType
}