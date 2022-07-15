import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/handleError";


export const userRouter = Router()

userRouter
    .get('/search/:content', async (req, res) => {
        const searchingUser = await UserRecord.search(req.params.content)
        res.json(searchingUser)
    })
    .get('/search', async (req, res) => {
        const searchingUser = await UserRecord.searchAll()
        res.json(searchingUser)
    })
    .post('/register', async (req, res) => {
        const user = req.body
        const newUser = new UserRecord(user)
        const isSuccess = await newUser.register()
        res.json({isSuccess})
    })
    .delete('/:id', async (req, res) => {
        const user = await UserRecord.getOne(req.params.id)

        if(user === null) {
            throw new ValidationError('Nie ma użytkownika o takim ID.')
        }

        await UserRecord.delete(req.params.id)
        res.json({ok: 'Użytkownik zostało prawidłowo usunięty.'})
    })
