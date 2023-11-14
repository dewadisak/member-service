import { Affiliate } from "../../database/shema/affiliate.shema";
import { Referral } from "../../database/shema/referral.shema";
import { User } from "../../database/shema/user.shema";

export class RegisterRepository {
  constructor() {
  }

  public async getAll() {
    try {
      const data = await User.findAll({});
      const result = data;
      return result;
    } catch (err) {
      console.log(err)
    }
  }

  public async createUser(body) {
    try {
      const data = await User.create(body);
      const result = data.dataValues;
      return result;
    } catch (err) {
      console.log(err)
    }
  }

  public async findByEmail(email: string) {
    try {
      const data = await User.findOne({ where: { email: email } });
      const result = data.dataValues;
      return result;

    } catch (err) {
      console.error(err)
    }
  }

  public async createAffiliate(body) {
    try {
      const data = await Affiliate.create(body);
      const result = data.dataValues;
      return result;
    } catch (err) {
      console.log(err)
    }
  }

  public async createReferral(body) {
    try {
      const data = await Referral.create(body);
      const result = data.dataValues;
      return result;
    } catch (err) {
      console.log(err)
    }
  }

  public async findUserIdByAffiliateCode(affiliateCode){
    try {
      const data = await Affiliate.findOne({ where: { affiliateCode: affiliateCode } });
      const userId = data.dataValues.userId;
      return userId;
    } catch (err) {
      console.log(err)
    }
  }

}