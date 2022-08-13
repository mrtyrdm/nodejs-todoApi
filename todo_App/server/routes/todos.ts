import * as express from 'express';
import todoController from "../controllers/todoController";
import UserController from "../controllers/userController";
import auth from "../middleware/auth";
const route = express.Router();

let todoControl : any = new todoController();
let userControl :any = new UserController();

route.get('/', auth,todoControl.list);
route.post('/add',auth, todoControl.store);
route.put('/update/:id',auth, todoControl.update);
route.delete('/delete/:id',auth, todoControl.destroy);

route.post('/register', userControl.register);
route.post('/login', userControl.login);

export default route;