import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";
import { LoginRepository } from "./login.repository";

export class LoginService {
  public loginRepository: LoginRepository;
  constructor() {
    this.loginRepository = new LoginRepository();
  }

  public async login(body) {
    try {
      if (!(body.email && body.password)) {
        response.status(400).send('All in put is required');
      }
      const email = body.email.toLocaleLowerCase();
      const data = await this.loginRepository.getDocumentByEmail(email);
      const verify =  await bcrypt.compare(body.password, data[0].password);
      if(data && verify){
        const token = jwt.sign(
          {
            user_id: data[0].user_id,
            email: data[0].email
          },
          'qwertyuiop',
          {
            expiresIn: '1m'
          }
        );
        await this.loginRepository.saveToken(token);
        return { status: true, message: 'Login success', accessToken: token}
      }
      return { status: false, message: 'Login fail'}

    } catch (err) {
      console.error(err);
    }
  }

}