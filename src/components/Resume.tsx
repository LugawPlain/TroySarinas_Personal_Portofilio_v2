"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X, Download, ExternalLink } from "lucide-react";
import { useTrack } from "@/hooks/use-track";

const Resume = ({
  resumeUrl,
  onClose,
}: {
  resumeUrl?: string;
  onClose?: () => void;
}) => {
  const router = useRouter();
  const trackDownload = useTrack("resume_download", "resume_modal");
  const trackView = useTrack("resume_view_full", "resume_modal");

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  };

  const handleDownload = () => {
    trackDownload({ url: resumeUrl, format: "pdf", triggered_from: "modal" });
    const link = document.createElement("a");
    link.href = resumeUrl || "/Software Engineer Developer Sarinas.pdf";
    link.download = "Troy_Sarinas_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewFullSize = () => {
    trackView({ url: resumeUrl, format: isPdf ? "pdf" : "image" });
    window.open(resumeUrl || "/SoftwareEngineerDeveloperSarinas.png", "_blank");
  };

  const src = resumeUrl || "/SoftwareEngineerDeveloperSarinas.png";
  const isPdf = src.endsWith(".pdf");

  const iframeSrc = isPdf ? `${src}#zoom=100` : src;
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.createElement("div");
    // give container a stable id/class for debugging
    el.className = "resume-modal-portal";
    document.body.appendChild(el);
    setPortalEl(el);
    return () => {
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  const modal = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-[95vw] max-w-[1200px] h-[90vh] rounded-xl overflow-hidden shadow-2xl grid grid-cols-[1fr_56px] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full bg-white">
          {isPdf ? (
            <iframe
              src={iframeSrc}
              title="Resume PDF"
              style={{
                width: "100%",
                height: "100%",
                border: "0",
                backgroundColor: "#ffffff",
                transform: "none",
                zoom: "100%",
              }}
              className="block"
            />
          ) : (
            <div className="relative w-full h-full bg-white">
              <Image
                alt="Resume"
                src={src}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>

        <div className="w-14 bg-white flex flex-col items-center justify-center gap-3 border-l border-gray-100">
          <button
            onClick={handleClose}
            className="p-2.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-6 h-px bg-gray-200" />

          <button
            onClick={handleDownload}
            className="p-2.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
            aria-label="Download"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={handleViewFullSize}
            className="p-2.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
            aria-label="Open in new tab"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  if (!portalEl) return null;
  return createPortal(modal, portalEl);
};

export default Resume;
