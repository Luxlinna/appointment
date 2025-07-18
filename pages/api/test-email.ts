import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
  logger: true,
  debug: true,
});

transporter.verify().then(() => {
  console.log("Transporter verified");
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: "Test email from Next.js",
    text: "This is a test",
  });
}).then(info => {
  console.log("Email sent:", info);
}).catch(console.error);
