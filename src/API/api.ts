import axios, {Axios, AxiosResponse} from "axios";
import {ProfileType} from "../../types/types";

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        headers: {"API-KEY": "06627c1b-f1df-4e21-a87d-e832678c110e"}

    }
);
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`
        ).then(response => response.data)
    },
    followUser(ID:number) {
        return instance.post(`follow/${ID}`).then(response => response.data)
    },
    unFollowUser(ID:number) {
        return instance.delete(`follow/${ID}`).then(response => response.data)
    },
    getProfile(profileId:number) {
     console.warn('Obsolete method.Please use profileAPI object')
        return profileAPI.getProfile(profileId);
    },
    getFriends(){
        return instance.get('users?friend=true').then(response=>response.data)
    },
    getProfileByName(name:string){
        return instance.get(`users?term=${name}`).then(response=>response.data);
    }
}
export const profileAPI = {
    getProfile(profileId:number) {
        return instance.get(`profile/${profileId}`)
    },
    getStatus(userId:number)
    {
        return instance.get('profile/status/'+userId)
    },
    updateStatus(status:string)
    {
        return instance.put('profile/status ',{
            status
        })
    },
    savePhoto(photo:any){
        const formData = new FormData();
        formData.append("image",photo);

        return instance.put(`profile/photo`,formData,
            {
                headers:
                    {
                        'Content-Type':'multipart/form-data'
                    }
            }
            );
    },
    saveProfile(profile:ProfileType){
        return instance.put('profile',profile);
    }

}


export enum ResultCodeEnum{
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha{
    CaptchaIsRequired =10
}
type MeResponseType = {
    data:{id:number,email:string,login:string}
    resultCode:ResultCodeEnum
    messages:Array<string>
}

type LoginResponseType = {
    data:{
        userId:number
    }
    resultCode:ResultCodeEnum|ResultCodeForCaptcha
    messages:Array<string>
}

export const authAPI = {
    me (){
        return instance.get<MeResponseType>(`auth/me`).then(res=>res.data)
    },
    loginUser(email:string,password:string,rememberMe = false,captcha="")
    {
        return instance.post<LoginResponseType>('/auth/login',{
            email,password,rememberMe,captcha
        }).then(res=>res.data)
    },
    logoutUser()
    {
        return instance.delete('auth/login');
    }
}

export const securityAPI ={
    getCaptchaUrl (){
        return instance.get(`security/get-captcha-url`);
    }
}
