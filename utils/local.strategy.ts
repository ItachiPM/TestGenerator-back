import {Strategy as LocalStrategy} from "passport-local";
import {FieldPacket} from "mysql2";
import passport from "passport";
import {pool} from "./db";
import {User} from "../types";

export type UserResponse = [User[], FieldPacket[]]

export const localStrategy = new LocalStrategy({
    usernameField: 'login',
    passwordField: 'pwdHash'
}, async (login, pwdHash, done) => {
    const [result] = await pool.execute('SELECT * FROM `users` WHERE `login` = :login', {
        login
    }) as UserResponse
    if (result.length === 0) {
        return done(null, false, {message: 'Nie znaleziono użytkownika'})
    }

    try {
        if (pwdHash === result[0].pwdHash) {
            return done(null, result[0])
        } else {
            return done(null, false, {message: 'Nieprawidłowe hasło'})
        }
    } catch (e) {
        return done(e)
    }
})

passport.serializeUser((user: User, done) => {
    return done(null, user)
})

passport.deserializeUser((user: User, done) => {
    return done(null, user.id)
})
