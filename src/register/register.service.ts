import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";
import { RegisterRepository } from "./register.repository";

export class LoginService {
  public registerRepository: RegisterRepository;

  constructor() {
    this.registerRepository = new RegisterRepository();
  }

  public async createAccount(body, headers) {
    try {
      const findByEmail = await this.registerRepository.findEmail(body.email);
      if (findByEmail.length) {
        console.log("is Exist")
        return response.status(401).send('Email Already Exist');
      }
      const decryptedPass = await bcrypt.hash(body.password, 10);
      const dataRegister = {
        email: body.email.toLocaleLowerCase(),
        password: decryptedPass
      }
      await this.registerRepository.create(dataRegister);
      const data = await this.registerRepository.getDocumentByEmail(body.email);
      const token = jwt.sign(
        {
          user_id: data[0].user_id,
          email: data[0].email
        },
        'qwertyuiop',
        {
          expiresIn: '2h'
        }
      )
      await this.registerRepository.saveToken(token);
      return null;
    } catch (err) {
      console.error(err);

    }

  }

  public generateUserId() {
    const userId = 'SO1:M01:G01:C01'
  }

}