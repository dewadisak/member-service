import { User } from "../../database/shema/user.shema";

export class ForgotPasswordRepository{
  public async findByEmail(email: string) {
    try {
      const data = await User.findOne({where: { email: email }});
      const result = data.dataValues;
      return result;

    } catch (err) {
      console.error(err)
    }
  }

  public async updatePassword(email: string, password: string) {
    try {
      const data = await User.update({ password: password} ,{ where: { email: email }});

    } catch (err) {
      console.error(err)
    }
  }
}