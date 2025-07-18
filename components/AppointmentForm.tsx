// // Components/AppointmentForm.tsx

import React from "react";

interface AppointmentFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    date: string;
    message: string;
  };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
    formData,
    onChange,
}) => {
    const { fullName, email, phone, date, message } = formData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // Optional: pass formData to a parent handler or backend API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={fullName}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={date}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={message}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;


