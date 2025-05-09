import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { ApiError } from "./helpers.js";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "CodeDrill",
      link: "https://codedrill.unknownbug.tech/",
    },
  });
  //info : Generate an HTML email with the provided contents
  const emailHTML = mailGenerator.generate(options.mailGenContent);

  //info : Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"CodeDrill" <${process.env.MAILTRAP_SMTP_EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: emailText, // plain text body
    html: emailHTML, // html body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log(info);
    return info;
  } catch (err) {
    throw new ApiError(500, "Error Sending the mail", err);
  }
};

const emailVerificationMailContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to CodeDrill! We're very excited to have you on board.",
      action: {
        instructions: "To get started with CodeDrill, please click here:",
        button: {
          color: "#22BC66", // info :Optional action button color
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailContent = (username, passwordResetURL) => {
  return {
    body: {
      name: username,
      intro: "Forgot your password? No worries we are here for you.",
      action: {
        instructions:
          "To reset your password for CodeDrill, please click here:",
        button: {
          color: "#22BC66", // info :Optional action button color
          text: "ResetPassword",
          link: passwordResetURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { sendMail, emailVerificationMailContent, forgotPasswordMailContent };
