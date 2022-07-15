import {Strategy as LocalStrategy} from "passport-local";
import {FieldPacket} from "mysql2";
import passport from "passport";
import {pool} from "./db";
import {User} from "../types";
import {hashPwd} from "./hash-pwd";

export type UserResponse = [User[], FieldPacket[]]

export const localStrategy = new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, async (login, password, done) => {
    const [result] = await pool.execute('SELECT * FROM `users` WHERE `login` = :login', {
        login
    }) as UserResponse
    if (result.length === 0) {
        return done(null, false, {message: 'Nie znaleziono użytkownika'})
    }
    try {
        if (hashPwd(password) === result[0].pwdHash) {
            return done(null, true)
        } else {
            return done(null, false, {message: 'Nieprawidłowe hasło'})
        }
    } catch (e) {
        return done(e)
    }
})

passport.serializeUser((isSuccess: boolean, done) => {
    return done(null, isSuccess)
})

passport.deserializeUser((user: User, done) => {
    return done(null, user.id)
})
