import jwt from 'jsonwebtoken';

class Auth {

    token:string;

    constructor(token) {
        this.token = token;
        this.auth(token);
    }

    public auth(token = this.token) : any{
        const token_get = token.split(' ')[1];
        const decodeToken = jwt.verify(token_get,'secretKey');
        return decodeToken;
    }

}

export default Auth;