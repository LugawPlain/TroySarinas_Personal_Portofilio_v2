"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Resume = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Software Engineer Developer Sarinas.pdf";
    link.download = "Troy_Sarinas_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewFullSize = () => {
    window.open("/SoftwareEngineerDeveloperSarinas.png", "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-11/12 max-w-4xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/50 to-transparent z-10 flex items-center justify-between px-6">
          <h2 className="text-white font-semibold text-lg">Resume</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-300 transition-colors text-2xl font-light"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Resume Image Container */}
        <div className="relative w-full h-full bg-gray-200">
          <Image
            alt="Resume - Software Engineer Developer Sarinas"
            src="/SoftwareEngineerDeveloperSarinas.png"
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent z-10 flex items-center justify-center gap-4 px-6">
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 transition-colors font-medium shadow-lg"
          >
            Download PDF
          </button>
          <button
            onClick={handleViewFullSize}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-lg"
          >
            View Full Size
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
