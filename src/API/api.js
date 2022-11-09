import axios from "axios";

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
    followUser(ID) {
        return instance.post(`follow/${ID}`).then(response => response.data)
    },
    unFollowUser(ID) {
        return instance.delete(`follow/${ID}`).then(response => response.data)
    },
    getProfile(profileId) {
     console.warn('Obsolete method.Please use profileAPI object')
        return profileAPI.getProfile(profileId);
    },
    getFriends(){
        return instance.get('users?friend=true').then(response=>response.data)
    },
    getProfileByName(name){
        return instance.get(`users?term=${name}`).then(response=>response.data);
    }
}
export const profileAPI = {
    getProfile(profileId) {
        return instance.get(`profile/${profileId}`)
    },
    getStatus(userId)
    {
        return instance.get('profile/status/'+userId)
    },
    updateStatus(status)
    {
        return instance.put('profile/status ',{
            status
        })
    },
    savePhoto(photo){
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
    saveProfile(profile){
        return instance.put('profile',profile);
    }

}



export const authAPI = {
    me (){
        return instance.get(`auth/me`)
    },
    loginUser(email,password,rememberMe = false,captcha=null)
    {
        return instance.post('/auth/login',{
            email,password,rememberMe,captcha
        })
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