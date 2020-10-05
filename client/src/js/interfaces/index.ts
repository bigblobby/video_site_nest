export interface IUserPostData {
    email: string;
    password: string;
}

export interface ILoginRegisterResponse {
    user: {
        id: number;
        email: string;
        verified: boolean;
    };
    token: string;
}

export interface IForgotPasswordData {
    email: string;
}

export interface IRegisterResponse extends ILoginRegisterResponse {}
export interface ILoginResponse extends ILoginRegisterResponse {}
