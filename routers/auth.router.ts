import {Router} from "express";
import passport from "passport";
import {hashPwd} from "../utils/hash-pwd";
import {UserRecord} from "../records/user.record";


export const authRouter = Router()

authRouter
    .post('/', (req, res) =>
    passport.authenticate('local', (err, isSuccess, mess) => {
        if (isSuccess) {
            return res
                .cookie('session_id', hashPwd('zalogowano'), {
                    secure: false,
                    maxAge: 12 * 60 * 60 * 1000,
                })
                .json({
                    isSuccess
                })
        }
        return res.json({
                isSuccess,
                mess: mess.message
            }
        )
    })(req, res))
    .post('/register', async (req, res) => {
        const user = req.body
        const newUser = new UserRecord(user)
        const isSuccess = await newUser.register()
        res.json({isSuccess})
    })
