"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: false,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const messageRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const messageData = await messageRes.json();
      if (!messageRes.ok) throw new Error(messageData.error || "Message error");

      if (formData.subscribe) {
        const subRes = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.name, email: formData.email }),
        });

        const subData = await subRes.json();
        if (!subRes.ok) throw new Error(subData.error || "Subscription error");

        toast.success("You're subscribed to the newsletter! 🎉");
      }

      toast.success("Message sent successfully! ✉️");
      setStatus("Message delivered. We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "", subscribe: false });
    } catch (err: any) {
      toast.error(err.message);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="p-10 bg-gray-100">
      <motion.h2
        className="text-3xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📬 Contact & Subscribe
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            className="border p-2 w-full mb-4 rounded"
            value={formData.name}
            onChange={handleChange}
            required
            variants={itemVariants}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            className="border p-2 w-full mb-4 rounded"
            value={formData.email}
            onChange={handleChange}
            required
            variants={itemVariants}
          />
          <motion.textarea
            name="message"
            placeholder="Message"
            className="border p-2 w-full mb-4 rounded"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            variants={itemVariants}
          />
          <motion.label
            className="flex items-center mb-4 text-sm text-gray-600"
            variants={itemVariants}
          >
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              className="mr-2"
            />
            Subscribe to our newsletter and become a member.
          </motion.label>
          <motion.button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            Send Message
          </motion.button>
          {status && (
            <motion.p
              className="text-sm text-center mt-2 text-green-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {status}
            </motion.p>
          )}
        </motion.form>

        {/* Info Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">📍 Address</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.168584923769!2d-122.41941508467715!3d37.77492977975844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808efcb2bd47%3A0xf3b20e3dd8b88d0!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2s!4v1615580017020!5m2!1sen!2s"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="text-blue-500 mt-1" />
            <p>
              <strong>Address:</strong>
              <br />
              LHVSBeauty
              <br />
              Fasanvägen 5, Perstorp 284 36, Sweden
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">🕒 Working Hours</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Mon – Fri: 9:00 AM – 6:00 PM</li>
              <li>Saturday: 10:00 AM – 3:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
// This component allows users to contact the clinic and subscribe to the newsletter.




