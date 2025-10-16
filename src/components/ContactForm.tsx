"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { IoSend, IoMail, IoPerson, IoDocumentText } from "react-icons/io5";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoMail size="32" className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out! I&aposll get back to you as soon as
            possible.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-primary hover:bg-primary/90"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ready to collaborate on something extraordinary? Let&aposs discuss
          your project and bring your ideas to life.
        </p>
      </div>

      <div className="bg-white rounded-lg p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-secondary"
              >
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoPerson className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-secondary rounded-lg focus:outline-accent focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondary"
              >
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-secondary rounded-lg focus:outline-accent focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-secondary"
            >
              Subject *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoDocumentText className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-2 border border-secondary rounded-lg focus:outline-accent focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="What's this about?"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-secondary"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="block w-full px-3 py-2 border border-secondary rounded-lg focus:outline-accent focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Tell me about your project, timeline, and any specific requirements..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-accent/90 hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <IoSend size="18" />
                  Send Message
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            * Required fields. I typically respond within 24 hours.
          </p>
        </form>
      </div>

      {/* Alternative Contact Info */}
      <div className="max-lg mx-auto mt-8 text-center">
        <p className="text-gray-600">
          Prefer to reach out directly? Email me at <br />
          <a
            href="mailto:troysarinas22@gmail.com"
            className="text-accent hover:underline font-medium"
          >
            troysarinas22@gmail.com
          </a>{" "}
          or call{" "}
          <a
            href="tel:+639569878251"
            className="text-accent hover:underline font-medium"
          >
            +63 956 987 8251
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
