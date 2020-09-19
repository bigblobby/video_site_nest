import axios from 'axios';
import TokenService from "./TokenService";

const instance = axios.create({
    baseURL: '/api'
});

class ApiService {
    cache = {};

    getCached(key, callback){
        if(this.cache.hasOwnProperty(key)) return this.cache[key];
        return this.cache[key] = callback();
    }

    get(url): Promise<any> {
        return new Promise((resolve, reject) => {
            instance.get(url)
                .then(response => {
                    resolve(response.data);
                }).catch(err => {
                    console.error(err);
                    reject(err.response.data);
                });
        });
    }

    post(url, params, config = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            instance.post(url, params, config)
                .then(response => {
                    resolve(response.data);
                }).catch(err => {
                    console.error(err);
                    reject(err.response.data);
                });
        });
    }

    verifyToken(){
        const token = TokenService.getToken();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const uri = '/auth/protect';
        return this.post(uri, {}, config);
    }

    registerUser(data){
        const uri = '/auth/register';
        return this.post(uri, data);
    }

    loginUser(data){
        const uri = '/auth/login';
        return this.post(uri, data);
    }

    createPost(data){
        const token = TokenService.getToken();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const uri = '/post/create';
        return this.post(uri, data, config);
    }

    getAllPosts(){
        const uri = '/post/all';
        return this.get(uri);
    }

    getUserChannel(params){
        const uri = '/user/channel';
        return this.post(uri, params);
    }
}

export default new ApiService();
