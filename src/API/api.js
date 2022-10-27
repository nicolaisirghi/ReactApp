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
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
        ).then(response => response.data)
    },
    followUser(ID) {
        return instance.post(`follow/${ID}`).then(response => response.data)
    },
    unFollowUser(ID) {
        return instance.delete(`follow/${ID}`).then(response => response.data)
    },
    getProfile(profileId) {
        return instance.get(`profile/${profileId}`)
    }
}

export const authAPI = {
    me (){
        return instance.get(`auth/me`)
    }
}