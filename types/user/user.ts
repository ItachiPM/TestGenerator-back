export interface User {
    id?: string;
    login: string;
    pwdHash: string;
}

export interface RegisterUser {
    login: string;
    password: string;
}
