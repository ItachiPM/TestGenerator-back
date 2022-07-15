import {Router} from "express";
import passport from "passport";
import {hashPwd} from "../utils/hash-pwd";


export const authRouter = Router()

authRouter
    .post('/login', (req, res) =>
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
    .post('/logout', (req, res) => {
        req.logout((err) => {
            if (err) {
                return err;
            }

            res.clearCookie('session_id', {
                secure: false,
            })
                .json({isLogout: true})

        })
    })
