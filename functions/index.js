import functions from "firebase-functions";
import admin from "firebase-admin";
import express from "express";
import nodemailer from "nodemailer";

admin.initializeApp();
const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailOnNewAppointment = functions.firestore
  .document("appointments/{id}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: "lhvsbeauty@gmail.com",
      to: [data.clientEmail, "clinic@example.com"],
      subject: `Appointment Confirmation - ${data.serviceName}`,
      html: `
        <h3>Appointment Confirmed</h3>
        <p><strong>Service:</strong> ${data.serviceName}</p>
        <p><strong>Doctor:</strong> ${data.doctorName}</p>
        <p><strong>Room:</strong> ${data.roomName}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <br>
        <p>Thank you for booking with us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  });

export const sendEmailOnAppointmentUpdate = functions.firestore
  .document("appointments/{id}")
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();

    if (beforeData.status !== afterData.status) {
      const mailOptions = {
        from: "lhvsbeauty@gmail.com",
        to: [afterData.clientEmail, "clinic@example.com"],
        subject: `Appointment Status Updated - ${afterData.serviceName}`,
        html: `
          <h3>Appointment Status Updated</h3>
          <p><strong>Service:</strong> ${afterData.serviceName}</p>
          <p><strong>Doctor:</strong> ${afterData.doctorName}</p>
          <p><strong>Room:</strong> ${afterData.roomName}</p>
          <p><strong>Date:</strong> ${afterData.date}</p>
          <p><strong>Time:</strong> ${afterData.time}</p>
          <p><strong>Status:</strong> ${afterData.status}</p>
          <br>
          <p>Thank you for booking with us!</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }
  });

export const sendEmailOnAppointmentDelete = functions.firestore
  .document("appointments/{id}")
  .onDelete(async (snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: "lhvsbeauty@gmail.com",
      to: [data.clientEmail, "clinic@example.com"],
      subject: `Appointment Cancelled - ${data.serviceName}`,
      html: `
        <h3>Appointment Cancelled</h3>
        <p><strong>Service:</strong> ${data.serviceName}</p>
        <p><strong>Doctor:</strong> ${data.doctorName}</p>
        <p><strong>Room:</strong> ${data.roomName}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <br>
        <p>We're sorry for any inconvenience this may have caused.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  });





// // functions/index.js
// // const functions = require("firebase-functions");
// // const admin = require("firebase-admin");
// import functions from "firebase-functions";
// import admin from "firebase-admin";
// import express from "express";
// const nodemailer = require("nodemailer");

// admin.initializeApp();
// const db = admin.firestore();

// // Setup email transporter (e.g., Gmail)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_FROM, // Your Gmail
//     pass: process.env.EMAIL_PASS, // App password (not normal login password)
//   },
// });

// exports.sendEmailOnNewAppointment = functions.firestore
//   .document("appointments/{id}")
//   .onCreate(async (snap, context) => {
//     const data = snap.data();

//     const mailOptions = {
//       from: "lhvsbeauty@gmail.com",
//       to: [data.clientEmail, "clinic@example.com"],
//       subject: `Appointment Confirmation - ${data.serviceName}`,
//       html: `
//         <h3>Appointment Confirmed</h3>
//         <p><strong>Service:</strong> ${data.serviceName}</p>
//         <p><strong>Doctor:</strong> ${data.doctorName}</p>
//         <p><strong>Room:</strong> ${data.roomName}</p>
//         <p><strong>Date:</strong> ${data.date}</p>
//         <p><strong>Time:</strong> ${data.time}</p>
//         <br>
//         <p>Thank you for booking with us!</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//   });
// exports.sendEmailOnAppointmentUpdate = functions.firestore
//   .document("appointments/{id}")
//   .onUpdate(async (change, context) => {
//     const beforeData = change.before.data();
//     const afterData = change.after.data();

//     if (beforeData.status !== afterData.status) {
//       const mailOptions = {
//         from: "lhvsbeauty@gmail.com",
//         to: [afterData.clientEmail, "clinic@example.com"],
//         subject: `Appointment Status Updated - ${afterData.serviceName}`,
//         html: `
//           <h3>Appointment Status Updated</h3>
//           <p><strong>Service:</strong> ${afterData.serviceName}</p>
//           <p><strong>Doctor:</strong> ${afterData.doctorName}</p>
//           <p><strong>Room:</strong> ${afterData.roomName}</p>
//           <p><strong>Date:</strong> ${afterData.date}</p>
//           <p><strong>Time:</strong> ${afterData.time}</p>
//           <p><strong>Status:</strong> ${afterData.status}</p>
//           <br>
//           <p>Thank you for booking with us!</p>
//         `,
//       };

//       await transporter.sendMail(mailOptions);
//     }
//   });
// exports.sendEmailOnAppointmentDelete = functions.firestore
//   .document("appointments/{id}")
//   .onDelete(async (snap, context) => {
//     const data = snap.data();

//     const mailOptions = {
//       from: "lhvsbeauty@gmail.com",
//       to: [data.clientEmail, "clinic@example.com"],
//       subject: `Appointment Cancelled - ${data.serviceName}`,
//       html: `
//         <h3>Appointment Cancelled</h3>
//         <p><strong>Service:</strong> ${data.serviceName}</p>
//         <p><strong>Doctor:</strong> ${data.doctorName}</p>
//         <p><strong>Room:</strong> ${data.roomName}</p>
//         <p><strong>Date:</strong> ${data.date}</p>
//         <p><strong>Time:</strong> ${data.time}</p>
//         <br>
//         <p>We're sorry for any inconvenience this may have caused.</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//   });
