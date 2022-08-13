import {Sequelize} from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
});

export default sequelize;