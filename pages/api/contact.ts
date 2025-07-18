import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log("Contact form message:", req.body);
    // TODO: Send email or store in DB
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to admin
  const adminMail = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `📩 New message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br />${message}</p>
    `,
  };

  // Email to user (thank-you)
  const thankYouMail = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "🎉 Thank You for Contacting LHVSBeauty!",
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for getting in touch with us! We're happy to receive your message and will get back to you as soon as we can.</p>
      <p>If you subscribed to our newsletter, keep an eye on your inbox for updates and exclusive offers!</p>
      <br/>
      <p>Warm regards,<br/>The LHVSBeauty Team 💖</p>
    `,
  };

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(thankYouMail);

    return res.status(200).json({ message: "Emails sent!" });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Email failed to send." });
  }
}
