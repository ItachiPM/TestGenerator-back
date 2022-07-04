import express, {json, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import session from "express-session";
import passport from "passport";
import rateLimit from "express-rate-limit";
import {questionRouter} from "./routers/question.router";
import {modulesRouter} from "./routers/modules.router";
import {testRouter} from "./routers/test.router";
import {authRouter} from "./routers/auth.router";
import {localStrategy} from "./utils/local.strategy";
import {handleError} from "./utils/handleError";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({ path: __dirname+'/.env' });

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5*60*100000,
    max: 100,
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

passport.use(localStrategy)

const router = Router();


router.use('/questions', questionRouter)
router.use('/modules', modulesRouter)
router.use('/test', testRouter)
router.use('/login', authRouter)

app.use('/api')

app.use(handleError)

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})
