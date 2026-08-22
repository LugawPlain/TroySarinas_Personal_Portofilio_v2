"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { IoSend, IoMail, IoPerson, IoDocumentText } from "react-icons/io5";
import { Code2, Terminal } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SoftwareEngineerContactForm = () => {
  const { role } = usePortfolio();
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
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
      <div className="max-w-2xl mx-auto px-6 py-12 sm:px-10 text-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoMail size="32" className="text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-secondary mb-2">Message Sent!</h3>
          <p className="text-stone-600 mb-6">
            Thanks for reaching out. I&apos;ll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-secondary hover:bg-secondary/90 text-white"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="px-6 pt-8 pb-2 sm:px-10">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
            <Code2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-base font-semibold text-secondary">Tell me about the build</p>
            <p className="mt-1 text-sm leading-relaxed text-stone-600 font-spacemono">
              Share the problem, stack, and timeline. I&apos;ll reply with the clearest next step.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 sm:px-10 sm:py-8">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-secondary">Full Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoPerson className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 bg-white border border-secondary/25 rounded-lg text-secondary placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-secondary">Email Address *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoMail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 bg-white border border-secondary/25 rounded-lg text-secondary placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-secondary">Subject *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoDocumentText className="h-5 w-5 text-stone-400" />
              </div>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-secondary/25 rounded-lg text-secondary placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Project collaboration"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-secondary">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="block w-full px-3 py-2.5 bg-white border border-secondary/25 rounded-lg text-secondary placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              placeholder="Tell me about your project requirements, tech stack, and timeline..."
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 border-t border-secondary/10 pt-6">
            <p className="text-xs text-stone-500">
              * Required fields
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-secondary/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Terminal className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <div className="border-t border-secondary/10 px-6 py-5 sm:px-10">
        <p className="text-stone-500 text-xs font-spacemono text-center">
          Or reach me directly at{" "}
          <a href="mailto:troyjeffreysarinas@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">
            troyjeffreysarinas@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default SoftwareEngineerContactForm;
