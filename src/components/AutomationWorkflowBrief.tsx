"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight, Check, CircleAlert, LoaderCircle } from "lucide-react";

interface AutomationWorkflowBriefProps {
  role: string;
}

interface BriefFormData {
  name: string;
  email: string;
  process: string;
  tools: string;
  bottleneck: string;
}

const initialFormData: BriefFormData = {
  name: "",
  email: "",
  process: "",
  tools: "",
  bottleneck: "",
};

export default function AutomationWorkflowBrief({ role }: AutomationWorkflowBriefProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const minimumFeedbackDelay = new Promise((resolve) => setTimeout(resolve, 300));
      const [response] = await Promise.all([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: "Workflow mapping request",
            message: [
              `Repetitive process:\n${formData.process}`,
              `Tools involved:\n${formData.tools}`,
              `Current bottleneck:\n${formData.bottleneck}`,
            ].join("\n\n"),
            role,
          }),
        }),
        minimumFeedbackDelay,
      ]);

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || "The brief couldn’t be sent. Please try again.");
      }

      setFormData(initialFormData);
      setIsSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The brief couldn’t be sent. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="automation-brief" id="workflow-brief" aria-labelledby="workflow-brief-title">
      <div className="automation-brief-intro">
        <h2 id="workflow-brief-title">Tell me where the work gets stuck.</h2>
        <p>
          Share the repetitive process, the tools involved, and the bottleneck.
          That is enough to start a useful automation conversation.
        </p>
      </div>

      {isSubmitted ? (
        <div className="automation-brief-success" role="status">
          <Check aria-hidden="true" />
          <div>
            <h3>Workflow brief sent.</h3>
            <p>Your process, tools, and bottleneck are ready for review.</p>
            <button
              className="automation-link"
              type="button"
              onClick={() => setIsSubmitted(false)}
            >
              Send another brief <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <form className="automation-brief-form" onSubmit={handleSubmit}>
          <div className="automation-brief-contact">
            <div className="automation-field">
              <label htmlFor="automation-brief-name">Name</label>
              <input
                id="automation-brief-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="automation-field">
              <label htmlFor="automation-brief-email">Email address</label>
              <input
                id="automation-brief-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="automation-field">
            <label htmlFor="automation-brief-process">What repetitive work should disappear?</label>
            <textarea
              id="automation-brief-process"
              name="process"
              rows={3}
              value={formData.process}
              onChange={handleChange}
              required
            />
          </div>

          <div className="automation-field">
            <label htmlFor="automation-brief-tools">Which tools are involved?</label>
            <input
              id="automation-brief-tools"
              name="tools"
              type="text"
              placeholder="Slack, ClickUp, Google Sheets…"
              value={formData.tools}
              onChange={handleChange}
              required
            />
          </div>

          <div className="automation-field">
            <label htmlFor="automation-brief-bottleneck">Where does the process get stuck?</label>
            <textarea
              id="automation-brief-bottleneck"
              name="bottleneck"
              rows={3}
              value={formData.bottleneck}
              onChange={handleChange}
              required
            />
          </div>

          <div className="automation-brief-feedback" aria-live="polite">
            {error && (
              <p className="automation-brief-error" role="alert">
                <CircleAlert aria-hidden="true" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="automation-brief-submit">
            <p>Three workflow details. One useful starting point.</p>
            <button
              className="automation-button automation-button-primary"
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="automation-spin" aria-hidden="true" />
                  Sending brief…
                </>
              ) : (
                <>
                  Send workflow brief <ArrowUpRight aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
