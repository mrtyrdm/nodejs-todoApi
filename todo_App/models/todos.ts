import {Sequelize, DataTypes} from "sequelize";
import db from '../config/database';

const Todos = db.define('todos', {
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
});

export default Todos;