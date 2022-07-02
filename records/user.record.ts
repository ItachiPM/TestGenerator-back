import {RegisterUser, User} from "../types";
import {hashPwd} from "../utils/hash-pwd";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {ValidationError} from "../utils/handleError";
import {v4 as uuid } from 'uuid'

type UserResponse = [User[], FieldPacket[]]

export class UserRecord implements User {
    id?: string;
    login: string;
    pwdHash: string;

    constructor(obj: RegisterUser) {
        this.login = obj.login
        this.pwdHash = hashPwd(obj.password)
    }

    async register() {
        if(!this.id) {
            this.id = uuid()
        }

        const [result] = await pool.execute('SELECT * FROM `users` WHERE `login` = :login', {
            login: this.login
        }) as UserResponse

        if(result.length !== 0) {
            throw new ValidationError('Podana nazwa użytkownika jest juz zajęta')
        } else {
            await pool.execute('INSERT INTO `users` VALUES(:id, :login, :pwdHash)', {
                id: this.id,
                login: this.login,
                pwdHash: this.pwdHash,
            })

            return true
        }
    }

}
