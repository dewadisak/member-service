import bcrypt from "bcrypt";
import 'dotenv/config';
import { response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { LoginRepository } from "./login.repository";

export class LoginService {
  public loginRepository: LoginRepository;
  constructor() {
    this.loginRepository = new LoginRepository();
  }
  public async login(body) {
    try {
      if (!(body.email && body.password)) {
        response.status(400).send('All input is required');
      }
      const email = body.email.toLocaleLowerCase();
      const data = await this.loginRepository.findByEmail(email);
      const verify = await bcrypt.compare(body.password, data.password);
      if (data.userStatus === 'pending') {
        this.verifyEmail(data.userId);
        return { status: false, message: 'Please verify email' };

      } else {
        if (data && verify) {
          const token = jwt.sign(
            {
              id: data.userId,
              email: data.email
            },
            process.env.JWT_KEY,
            {
              expiresIn: '10m'
            }
          );
          return { status: true, message: 'Login success', accessToken: token };
        }
      }

      return { status: false, message: 'Login fail' };

    } catch (err) {
      console.error(err);
    }
  }

  public verifyEmail(userId) {
    const urlLink = `http://localhost:3000/verify/${userId}`;
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
      to: "adisak.timtim@gmail.com",
      subject: "Message",
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
                  ยืนยันการสมัคร
                </div>
                <div class="p12-bottom" style="font-size: 18px; font-weight: 600;">
                  สวัสดี คุณ 
                </div>
                <div class="font-style">
                  กรุณาคลิกปุ่มด้านล่างเพื่อ ยืนยันการสมัคร 
                </div>
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                      <td align="center" style="padding: 40px;">
                          <table cellspacing="0" cellpadding="0">
                              <tr>
                               <td style="border-radius: 4px;" bgcolor="#008DFF">
                                <a style="text-align: center; padding: 8px 12px; width:217px; border-radius: 4px;font-family: Arial, Helvetica, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none; display: inline-block;" class="link" href="${urlLink}" target="_blank">
                                คลิก ยืนยันการสมัคร           
                                </a>
                               </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                </table>
                <div class="font-style" style="margin-bottom: 30px;">
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

  public async updateUserStatus(userId) {
    await this.loginRepository.updateUserStatus(userId);
  }

}