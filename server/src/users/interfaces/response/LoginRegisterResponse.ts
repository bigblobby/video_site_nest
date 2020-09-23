export interface ILoginRegisterResponse {
    user: {
        id: number;
        email: string;
        verified: boolean;
    },
    token: string;
}
