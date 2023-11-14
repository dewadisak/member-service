import { User } from "../../database/shema/user.shema";
export class LoginRepository{
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