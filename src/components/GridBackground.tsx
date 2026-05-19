"use client";

import React, { useEffect, useRef } from "react";

interface GridBackgroundProps {
  gridSize?: number;
  lineColor?: string;
  glowColor?: string;
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  gridSize = 50,
  lineColor = "rgba(100, 149, 237, 0.08)",
  glowColor = "rgba(59, 130, 246, 0.9)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    const resize = () => {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    interface Pulse {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }

    const pulses: Pulse[] = [];

    const createPulse = () => {
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);

      pulses.push({
        x: col * gridSize,
        y: row * gridSize,
        radius: 0,
        maxRadius: gridSize * 3,
        opacity: 1,
        speed: 0.8 + Math.random() * 0.7,
      });
    };

    for (let i = 0; i < 8; i++) {
      createPulse();
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(100, 149, 237, 0.12)";
          ctx.fill();
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];

        const gradient = ctx.createRadialGradient(
          pulse.x,
          pulse.y,
          0,
          pulse.x,
          pulse.y,
          pulse.radius
        );
        gradient.addColorStop(0, glowColor.replace("0.9", String(pulse.opacity * 0.9)));
        gradient.addColorStop(0.5, glowColor.replace("0.9", String(pulse.opacity * 0.4)));
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        pulse.radius += pulse.speed;
        pulse.opacity -= 0.006;

        if (pulse.opacity <= 0) {
          pulses.splice(i, 1);
        }
      }

      if (Math.random() < 0.025 && pulses.length < 12) {
        createPulse();
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gridSize, lineColor, glowColor]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}
    >
      {/* Gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(157deg, rgba(184, 229, 255, 0.8) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 50%, rgba(248, 222, 255, 0.7) 75%, rgba(184, 229, 255, 0.6) 100%)"
        }}
      />
      {/* Grid canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
};

export default GridBackground;
