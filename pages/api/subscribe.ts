import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { db } from "@lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // ✅ 1. Save to Firestore
  try {
    await setDoc(doc(db, "subscribers", email), {
      name,
      email,
      subscribedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Firestore Error:", error);
    return res.status(500).json({ error: "Failed to store subscription in Firebase" });
  }

  // ✅ 2. Subscribe to Mailchimp
  try {
    const md5 = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");

    const DATACENTER = process.env.MAILCHIMP_DC;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID;

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${md5}`;

    const data = {
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: { FNAME: name },
      tags: ["WebsiteForm", "Welcome"],
    };

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status >= 400) {
      return res.status(400).json({ error: result.detail || "Mailchimp subscription error" });
    }
  } catch (err) {
    console.error("Mailchimp Error:", err);
    return res.status(500).json({ error: "Subscribed in Firebase, but Mailchimp failed." });
  }

  // ✅ 3. Send Thank-You Email to Client
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS, // App password for Gmail
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "🎉 Thank You for Subscribing!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for subscribing to LHVSBeauty! 💅</p>
        <p>We're excited to have you in our beauty community. Stay tuned for updates, promotions, and beauty tips.</p>
        <br />
        <p>With love,</p>
        <strong>LHVSBeauty Team</strong>
      `,
    });
  } catch (error) {
    console.error("Email Send Error:", error);
    // No need to fail request if thank-you email fails
  }

  return res.status(200).json({ message: "Subscribed via Mailchimp + Firebase 🎉 and thank-you email sent!" });
}






