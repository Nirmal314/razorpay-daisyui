import nodemailer from "nodemailer";

export default function handler(req, res) {
  const { email, url } = req.body;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.NEXT_PUBLIC_MAIL,
      pass: process.env.NEXT_PUBLIC_PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: process.env.NEXT_PUBLIC_MAIL,
    to: email,
    subject: `verify your account at PDFviewer`,
    text: "Verify your account here",
    html: `<p>Verify your account here: ${process.env.NEXT_PUBLIC_URL}/auth?token=${
      url.split("=")[1]
    } </p><a target="_blank" href="${process.env.NEXT_PUBLIC_URL}/auth?token=${
      url.split("=")[1]
    }"></a>`,
    // html: `<div style="height: 500px; width: 500px;"><p>Welcome to PDFviewer! <br />Verify your account </p><div style="height: 20px; width:500px;"><a target="_blank" style="border-radius: 7px; text-decoration: none; background-color: rgb(39, 48, 233); color: white; padding: 10px; font-size: small;" href="${process.env.NEXT_PUBLIC_URL}/auth?token=${url.split("=")[1]}">Verify</a></div></div>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
// ${process.env.NEXT_PUBLIC_URL}/auth?token=${url.split("=")[1]}
