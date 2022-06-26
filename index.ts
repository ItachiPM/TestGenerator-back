import express, {json} from "express";
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

dotenv.config({ path: __dirname+'/.env' });

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
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

passport.use(localStrategy)

app.use('/questions', questionRouter)
app.use('/modules', modulesRouter)
app.use('/test', testRouter)
app.use('/login', authRouter)

app.use(handleError)

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})
