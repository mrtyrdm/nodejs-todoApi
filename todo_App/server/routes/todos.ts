import * as express from 'express';
import todoController from "../controllers/todoController";
import UserController from "../controllers/userController";
import {Validator} from "../middleware/validator";

import auth from "../middleware/auth";
const route = express.Router();

let todoControl : any = new todoController();
let userControl :any = new UserController();

route.get('/', auth,todoControl.list);

route.post('/add',auth, Validator({
    name: {isString:true,notEmpty: true},
    deadline:{isString:true,notEmpty:true}
}), todoControl.store);

route.put('/update/:id',auth, todoControl.update);
route.delete('/delete/:id',auth, todoControl.destroy);

route.post('/register',Validator( {
    email: { isEmail: true, notEmpty: true},
    password: {isString:true,notEmpty:true}
}), userControl.register);

route.post('/login',Validator({
    email: { isEmail: true, notEmpty: true},
    password: {isString:true,notEmpty:true}
}) ,userControl.login);

export default route;