import nodemailer from "nodemailer";

export const memberEmailSender = (userInDb) => {
  console.log("in email sender");

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  console.log("transporter created");
  let email = userInDb.email;
  let token = userInDb.resetPasswordToken;
  // let text =
  //   "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
  //   `http://localhost:3001/updatepassword?token=${token}\n\n` +
  //   "If you did not request this, please ignore this email.\n";
  let text =
    "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
    `https://fincta-webapp.herokuapp.com/updatepassword?token=${token}\n\n` +
    "If you did not request this, please ignore this email.\n";
  const mailOptions = {
    from: "", //email
    to: email,
    subject: "Link To set password",
    text,
  };

  console.log("sending mail");

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error("there was an error: ", err);
      throw err;
    } else {
      console.log("here is the res: ", response);
      return true;
    }
  });
};
