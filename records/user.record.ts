import {RequestUser, User, UserForAdminResponse, UserResponse, UserResponseForAdmin} from "../types";
import {hashPwd} from "../utils/hash-pwd";
import {pool} from "../utils/db";
import {ValidationError} from "../utils/handleError";
import {v4 as uuid } from 'uuid'

export class UserRecord implements User {
    id?: string;
    login: string;
    pwdHash: string;

    constructor(obj: RequestUser) {
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

    static async getOne(id: string): Promise<User> {
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
            id,
        }) as UserResponse

        return results.length === 0 ? null : results[0];
    }

    static async search(content: string): Promise<UserResponseForAdmin[]> {
        const [results] = await pool.execute('SELECT `id`, `login` FROM `users` WHERE `login` LIKE :content', {
            content: `%${content}%`,
        }) as UserForAdminResponse

        return results
    }

    static async searchAll(): Promise<UserResponseForAdmin[]> {
        const [results] = await pool.execute('SELECT `id`, `login` FROM `users`') as UserForAdminResponse

        return results
    }

    static async delete(id: string) {
        await pool.execute('DELETE FROM `users` WHERE `id` = :id', {
            id
        })
    }
}
