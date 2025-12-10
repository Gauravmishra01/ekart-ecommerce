import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = async (token, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const verifyLink = `${process.env.CLIENT_URL}/verify/${token}`;

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Hi!

You recently created an account on Ekart.
Please click the link below to verify your email:

${verifyLink}

If you did not request this, please ignore this email.

Thanks,
Ekart Team`,
    };

    await transporter.sendMail(mailConfigurations);

    console.log("✅ Email Sent Successfully");
  } catch (error) {
    console.error("❌ Email Send Failed:", error.message);
  }
};
