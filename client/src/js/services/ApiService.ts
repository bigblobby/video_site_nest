import axios from 'axios';
import TokenService from "./TokenService";
import {IForgotPasswordData, ILoginResponse, IRegisterResponse, IUserPostData} from "../interfaces";

const instance = axios.create({
    baseURL: '/api'
});

class ApiService {
    cache = {};

    getCached(key: string, callback: Function): any {
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

    verifyEmail(token){
        const uri = `/auth/email/verify/${token}`;
        return this.get(uri);
    }

    registerUser(data: IUserPostData): Promise<IRegisterResponse>{
        const uri = '/auth/register';
        return this.post(uri, data);
    }

    loginUser(data: IUserPostData): Promise<ILoginResponse>{
        const uri = '/auth/login';
        return this.post(uri, data);
    }

    requestPasswordReset(data: IForgotPasswordData){
        const uri = '/auth/user/forgot-password';
        return this.post(uri, data);
    }

    getUserChannel(params){
        const uri = '/user/channel';
        return this.post(uri, params);
    }
}

export default new ApiService();
