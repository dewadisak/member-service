import * as Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import sequelize from '../sql-pg-config';



export interface UserModel extends Sequelize.Model<UserModel> {
  userId: string
  email: string
  password: string
  name: string
  lastName: string
  nickname: string
  phone: string
  ip: string
  role: string
  userStatus: string
  brithDate: Date
  createdAt: string
  updatedAt: string
}

export const User = sequelize.define('user', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  name: Sequelize.STRING,
  lastName: Sequelize.STRING,
  nickname: Sequelize.STRING,
  phone: Sequelize.STRING,
  ip: Sequelize.STRING,
  role: Sequelize.STRING,
  userStatus: Sequelize.STRING,
  brithDate: Sequelize.DATE
})