import * as Sequelize from 'sequelize';
import sequelize from '../sql-pg-config';

export interface ReferralModel extends Sequelize.Model<ReferralModel> {
  referralId: string
  affiliateId: string
  referredByUserId: string
}

export const Referral = sequelize.define('referral', {
  referralId: Sequelize.STRING,
  affiliateId: Sequelize.STRING,

})