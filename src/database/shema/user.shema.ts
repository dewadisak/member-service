import * as Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import sequelize from '../sql-pg-config';



export interface UserModel extends Sequelize.Model<UserModel> {
  id: string
  memberId: string
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
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  memberId: Sequelize.STRING,
  referralId: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  name: Sequelize.STRING,
  nickname: Sequelize.STRING,
  lastName: Sequelize.STRING,
  phone: Sequelize.STRING,
  ip: Sequelize.STRING,
  role: Sequelize.STRING,
  userStatus: Sequelize.STRING,
  brithDate: Sequelize.DATE
})