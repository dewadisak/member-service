import * as Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import sequelize from '../sql-pg-config';

export interface UserAddModel {
  id: any;
  email: string
  password: string
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

export const User = sequelize.define<UserModel, UserAddModel>('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING
})