import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";
import { RegisterRepository } from "./register.repository";

export class RegisterService {
  public registerRepository: RegisterRepository;

  constructor() {
    this.registerRepository = new RegisterRepository();
  }

  public async createAccount(body) {
    try {
      const findByEmail = await this.registerRepository.findEmail(body.email);
      if (findByEmail.length) {
        console.log("is Exist")
        response.status(401).send('Email Already Exist');
        return;
      }
      const decryptedPass = await bcrypt.hash(body.password, 10);
      const dataRegister = {
        email: body.email.toLocaleLowerCase(),
        password: decryptedPass
      }
      await this.registerRepository.create(dataRegister);
      const data = await this.registerRepository.getDocumentByEmail(body.email);
      console.log('data', data)
      const token = jwt.sign(
        {
          user_id: data[0].user_id,
          email: data[0].email
        },
        'qwertyuiop',
        {
          expiresIn: '10m'
        }
      );
      await this.registerRepository.saveToken(token, data[0].user_id, data[0].email );
      return { status: true, message: 'Register success'}
    } catch (err) {
      console.error(err);

    }

  }

  public generateUserId() {
    const userId = 'SO1:M01:G01:C01'
  }

}