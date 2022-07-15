import {FieldPacket} from "mysql2";

export interface User {
    id?: string;
    login: string;
    pwdHash: string;
}

export interface RequestUser {
    login: string;
    password: string;
}

export type UserResponseForAdmin = {
    id: string;
    login: string;
}

export type UserResponse = [User[], FieldPacket[]]
export type UserForAdminResponse = [UserResponseForAdmin[], FieldPacket[]]
