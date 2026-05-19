"use client";
import Image from "next/image";
import React from "react";
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
    window.open(
      resumeUrl || "/SoftwareEngineerDeveloperSarinas.png",
      "_blank",
    );
  };

  const src = resumeUrl || "/SoftwareEngineerDeveloperSarinas.png";
  const isPdf = src.endsWith(".pdf");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={handleClose}
    >
      <div
        className="flex w-[95vw] h-[90vh] gap-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-l-xl">
          {isPdf ? (
            <iframe
              src={src}
              className="w-full h-full bg-zinc-900"
              title="Resume PDF"
            />
          ) : (
            <div className="relative w-full h-full bg-zinc-900">
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

        <div className="w-14 bg-zinc-900/95 flex flex-col items-center justify-center gap-3 rounded-r-xl border-l border-white/5">
          <button
            onClick={handleClose}
            className="p-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-6 h-px bg-white/10" />

          <button
            onClick={handleDownload}
            className="p-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Download"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={handleViewFullSize}
            className="p-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Open in new tab"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
