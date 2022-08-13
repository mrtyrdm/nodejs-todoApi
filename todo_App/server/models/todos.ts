import {Sequelize, DataTypes} from "sequelize";
import db from '../config/database';

const Todos = db.define('todos', {
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  user_id : {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  updatedAt : {
    type: new DataTypes.DATE()
  },
  status : {
    type: new  DataTypes.BOOLEAN()
  }

});

export default Todos;