import { checkSchema, Schema, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";


export const Validator =
    (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
        await checkSchema(schema).run(req);
        const errors = validationResult(req);
        if (errors.isEmpty()){
            return next();
        }

        if (!errors.isEmpty()) {
            const resp:any = {
                status: false,
                errors: errors.array({ onlyFirstError: true }),
                message: 'validate',
            };
            return res.send(resp);
        } else next();
    }
