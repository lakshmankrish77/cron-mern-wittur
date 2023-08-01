// import nodemailer from "nodemailer";

import { createTransport } from "nodemailer";

// create reusable transporter object using the default SMTP transport

// To change the password of the transporter - follow the steps below (look for "App Password")
// https://support.google.com/mail/answer/185833?hl=en
const transporter = createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  auth: {
    user: "witturtest596@gmail.com",
    pass: "ywdopscpqpmnbihs",
  },
});

const SENDMAIL = async (mailDetails, callback) => {
    try {
      const info = await transporter.sendMail(mailDetails)
      callback(info);
    } catch (error) {
      console.log(error);
    } 
  };

  export default SENDMAIL;