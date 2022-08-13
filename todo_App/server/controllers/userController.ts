import user from "../models/user";
import {Request, Response} from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserController {
    constructor() {
        this.register = this.register();
        this.login = this.login();
    }

    public register(): any {
        return (req: Request, res: Response) => {
            user.create({email: req.body.email, password: req.body.password}).then((course) =>
                res.send({'message': 'Success'}))
                .catch((error) => res.status(400).send(error));
        }
    }

    public login(): any {
        return (req: Request, res: Response) => {
            const {password, email} = req.body;

            // Email Control
            user.findOne({
                where: {email:email}
            }).then(data => {

                // Password Control
                bcrypt.compare(password, data.get('password')).then((status) => {

                    if (status){
                        type Token = {
                            id: number;
                            email: string;
                            exp: string
                        }

                        const token: Token = jwt.sign({
                            id: data.get('id'),
                            email: data.get('email'),
                            exp: Math.floor((Date.now() / 1000) + (60 * 60))
                        }, 'secretKey');

                        return res.send({
                            "users": {
                                "id": data.get('id'),
                                "email": data.get('email')
                            }, 'token': token , 'status' : true
                        });
                    }else {
                        return res.send({'message': 'by password or e-mail', 'errors': 'password', 'status' : false});
                    }

                }).catch((e) => {
                    return res.send({'message': 'by password or e-mail', 'errors': e, 'status' : false});
                });

            }).catch(error => {
                return res.send({'message': 'Not users find', 'errors': error, 'status' : false});
            });


        }
    }
}

export default UserController;