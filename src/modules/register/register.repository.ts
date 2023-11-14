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

  public async create(body) {
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
      const data = await User.findOne({where: { email: email }});
      const result = data.dataValues;
      return result;

    } catch (err) {
      console.error(err)
    }
  }

}