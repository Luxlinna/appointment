import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { adminDb } from "@lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { name, email, roomId, service, doctor, date, time } = req.body;

  if (!name || !email || !roomId || !service || !doctor || !date || !time) {
    return res.status(400).json({ error: "Missing required booking fields" });
  }

  try {
    // 1. Save booking to Firestore
    // ✅ Use Firebase Admin SDK to write to Firestore
    const bookingRef = await adminDb.collection("bookings").add({
      name,
      email,
      roomId,
      service,
      doctor,
      date,
      time,
      createdAt: FieldValue.serverTimestamp(),
    });

    console.log("📦 Booking saved with ID:", bookingRef.id);

    // 2. Setup nodemailer transporter (Gmail SMTP)
    // ✅ Nodemailer config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
      debug: true,
    });

    // Optional: verify connection (remove in production)
    await transporter.verify();
    console.log("✅ Transporter verified");

    // 3. Admin notification email
    const adminMail = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `📩 New Booking from ${name}`,
      html: `
        <h3>New Appointment Booking</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Doctor:</strong> ${doctor}</li>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Room:</strong> ${roomId}</li>
        </ul>
        <p>🕐 Booked at: ${new Date().toLocaleString()}</p>
      `,
    };

    // 4. Client confirmation email
    const confirmationEmail = {
      from: `"LHVSBeauty" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "✅ Appointment Confirmation – LHVSBeauty",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for booking with <strong>LHVSBeauty</strong>!</p>
        <p><strong>Appointment Details:</strong></p>
        <ul>
          <li><strong>Doctor:</strong> ${doctor}</li>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Room:</strong> ${roomId}</li>
        </ul>
        <p>We’ll send you a reminder 24 hours before your appointment.</p>
        <br />
        <p>💖 LHVSBeauty Team</p>
      `,
    };

    // 5. Send both emails in parallel
    // const [adminResult, userResult] = await Promise.all([
      await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(confirmationEmail),
    ]);

    console.log("📧 Emails sent successfully");

    return res.status(200).json({ message: "Appointment booked and emails sent successfully 🎉" });
  } catch (error) {
    console.error("❌ Error sending email or saving booking:", error);
    return res.status(500).json({ error: "Booking saved, but email failed to send." });
  }
}

