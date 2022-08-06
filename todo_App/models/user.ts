import {Sequelize, DataTypes} from "sequelize";
import db from '../config/database';
import bcrypt from 'bcrypt';

const Users = db.define('Users', {
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: (user: any, options) => {
            {
                user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
            }
        }
    }
});


export default Users;