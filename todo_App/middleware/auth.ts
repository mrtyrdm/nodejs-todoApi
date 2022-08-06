import jwt from 'jsonwebtoken';

const Auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token,'secretKey');
        next();
    }catch (error) {
        res.send({'auth' : 'Not token find'});
    }

}

export default Auth;