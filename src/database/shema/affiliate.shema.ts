import * as Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import sequelize from '../sql-pg-config';

export interface AffiliateModel extends Sequelize.Model<AffiliateModel> {
  affiliateId: string
  userId: string
  affiliateCode: string
}

export const Affiliate = sequelize.define('affiliate', {
  affiliateId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: Sequelize.STRING,
  affiliateCode: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },

})