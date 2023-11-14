import * as Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import sequelize from '../sql-pg-config';

export interface ReferralModel extends Sequelize.Model<ReferralModel> {
  referralId: string
  affiliateId: string
  referredByUserId: string
}

export const Referral = sequelize.define('referral', {
  referralId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  affiliateId: Sequelize.STRING,
  referredByUserId: Sequelize.STRING

})