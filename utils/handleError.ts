import {Request, Response, NextFunction} from 'express'

export class ValidationError extends Error{}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .json(err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie za kilka minut.')
}
