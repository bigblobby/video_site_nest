export interface IUserPostData {
    email: string;
    password: string;
}

export interface ILoginRegisterResponse {
    token: string;
    user: {
        id: number;
        email: string;
    };
}

export interface IRegisterResponse extends ILoginRegisterResponse {}
export interface ILoginResponse extends ILoginRegisterResponse {}
