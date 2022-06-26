import {Router} from "express";
import passport from "passport";


export const authRouter = Router()

authRouter.post('/', (req, res) =>
    passport.authenticate('local', (err, user, mess) => {
        return res.json({user, mess})
    })(req, res))
