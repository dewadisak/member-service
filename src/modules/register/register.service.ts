import bcrypt from "bcrypt";
import { response } from "express";
import { RegisterRepository } from "./register.repository";

export class RegisterService {
  public registerRepository: RegisterRepository;

  constructor() {
    this.registerRepository = new RegisterRepository();
  }

  public async createAccount(body) {
    try {
      const findByEmail = await this.registerRepository.findByEmail(body.email);
      if (findByEmail) {
        console.log("is Exist")
        response.status(401).send('Email Already Exist');
        return;
      }
      const affiliateCode = body.affiliateCode;
      const decryptedPass = await bcrypt.hash(body.password, 10);
      const dataRegister = {
        email: body.email.toLocaleLowerCase(),
        password: decryptedPass,
        name: body.name,
        lastName: body.lastName,
        nickname: body.nickname,
        phone: body.phone,
        ip: body.ip,
        role: body.role,
        userStatus: body.userStatus,
        brithDate: body.brithDate
      }
      const result = await this.registerRepository.createUser(dataRegister);
      const resultAffiliate = await this.createAffiliate(result);
      const resultReferral = await this.createReferral(resultAffiliate, result.role, affiliateCode);
      if(result && resultAffiliate && resultReferral){
        return { status: true, message: 'Register success'};
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async createAffiliate(data) {
    const dataAffiliate = {
      userId: data.userId
    };
    return await this.registerRepository.createAffiliate(dataAffiliate);
  }

  public async createReferral(data, role, affiliateCode) {
    const referredByUserId = await this.registerRepository.findUserIdByAffiliateCode(affiliateCode);
    const dataReferral = {
      affiliateId: data.affiliateId,
      referredByUserId: referredByUserId
    };
    if(role === 'SENIOR'){
      dataReferral.referredByUserId = '';
    }
    return await this.registerRepository.createReferral(dataReferral);
  }

}