require("dotenv").config();

import nodemailer, { Transporter } from "nodemailer";

import ejs from "ejs";

import path from "path";

interface EmailOptions {
  email: string;
  subject: string;
  template: string; // Corrected the spelling to 'template'
  data: { [key: string]: any };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  // Added missing parentheses
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: parseInt(process.env.SMPT_PORT || "587"),
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const { email, subject, template, data } = options; // Corrected 'templete' to 'template'

  const templatePath = path.join(__dirname, "../mails", template); // Corrected 'templete' to 'template'

  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.SMPT_MAIL, // Changed semicolon to a comma
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
