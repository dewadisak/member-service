import bcrypt from "bcrypt";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { ForgotPasswordRepository } from "./forgot-password.repository";
export class ForgotPasswordService {
  public forgotPasswordRepository: ForgotPasswordRepository;
  constructor() {
    this.forgotPasswordRepository = new ForgotPasswordRepository();
  }
 

  public async setNewPassword(body){
    const {email, password } = body;
    const decryptedPass = await bcrypt.hash(password, 10);
    await this.forgotPasswordRepository.updatePassword(email, decryptedPass)

  }

  public async sendMail(email){
    const data = await this.forgotPasswordRepository.findByEmail(email);
    const token = jwt.sign(
      {
        id: data.id,
        email: data.email
      },
      process.env.JWT_KEY,
      {
        expiresIn: '5m'
      }
    );
    await this.setMessage(email, token);
    return {status: true , message: 'send mail success'}
  }

  public setMessage(email, token){
    const urlLink = `http://localhost:3000/reset-password/${token}`;
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_NM,
        pass: process.env.PASSWORD_NM
      }
    });
    transporter.sendMail({
      from: "nanobot.th@gmail.com",
      to: `${email}`,
      subject: 'Forgot Password',
      html: `
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Static Template</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;700&display=swap"
              rel="stylesheet"
            />
            <style >
              * {
                font-family: "Noto Sans Thai", sans-serif;
                color: #21244b;
              }
              button {
                border: none;
                border-radius: 4px;
                width: 217px;
                height: 42px;
                color: #ffffff;
                background: #008dff;
                cursor: pointer;
              }
              div {
                font-family: "Noto Sans Thai", sans-serif;
              }
              #btn-new-password {
                display: flex;
                justify-content: center;
                margin: 30px 0;
                font-family: "Noto Sans Thai", sans-serif;
              }

              .font-style {
                font-size: 14px;
                font-weight: 400;
              }
              .p12-bottom {
                padding-bottom: 12px;
              }
            </style>
          </head>
          <body>
            <div
              style="
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: "Noto Sans Thai"
              "
            >
              <div style="width: 620px; padding: 20px;  font-family: Noto Sans Thai">
                <div>
                </div>
                <div
                  style="
                    text-align: center;
                    font-weight: 600;
                    font-size: 36px;
                    margin: 30px 0;
                  "
                >
                  ตั้งรหัสผ่านใหม่
                </div>
                <div class="p12-bottom" style="font-size: 18px; font-weight: 600;">
                  สวัสดี คุณ
                </div>
                <div class="font-style">
                  ระบบได้คำขอตั้งรหัสผ่านใหม่ของคุณแล้ว
                  กรุณาคลิกปุ่มด้านล่างเพื่อตั้งรหัสผ่านสำหรับการใช้งานใหม่ ภายใน 5 นาที
                  หลังจากนั้นลิงก์นี้จะหมดอายุและไม่สามารถใช้ได้อีก
                </div>
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                      <td align="center" style="padding: 40px;">
                          <table cellspacing="0" cellpadding="0">
                              <tr>
                               <td style="border-radius: 4px;" bgcolor="#008DFF">
                                <a style="text-align: center; padding: 8px 12px; width:217px; border-radius: 4px;font-family: Arial, Helvetica, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none; display: inline-block;" class="link" href="${urlLink}" target="_blank">
                                คลิก ตั้งรหัสผ่านใหม่           
                                </a>
                               </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                </table>
                <div class="font-style" style="margin-bottom: 30px;">
                  หากคุณไม่ได้ส่งคำขอนี้ คุณสามารถปล่อยอีเมล์นี้ทิ้งไว้ได้เลย
                  เพราะว่าบัญชีและข้อมูลทั้งหมดของคุณยังได้รับ
                  การดูแลรักษาความปลอดภัยเป็นอย่างดี
                </div>
                <div class="font-style" style="margin-bottom: 12px;">ขอบคุณ</div>
                <div class="font-style">จากทีมงาน nanobot</div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

  }
}