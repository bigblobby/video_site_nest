class TokenService {
    setToken(token){
        localStorage.setItem('user_token', token);
        return token;
    }

    getToken(){
        return localStorage.getItem('user_token');
    }

    removeToken(){
        localStorage.removeItem('user_token');
    }
}

export default new TokenService();
