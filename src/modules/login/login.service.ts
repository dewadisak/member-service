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
      const data = await this.loginRepository.findByEmail(email);
      const verify =  await bcrypt.compare(body.password, data.password);
      if(data && verify){
        const token = jwt.sign(
          {
            id: data.id,
            email: data.email
          },
          'qwertyuiop',
          {
            expiresIn: '1m'
          }
        );
        return { status: true, message: 'Login success', accessToken: token}
      }
      return { status: false, message: 'Login fail'}

    } catch (err) {
      console.error(err);
    }
  }

}