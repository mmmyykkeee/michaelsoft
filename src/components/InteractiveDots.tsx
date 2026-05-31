"use client";

import React, { useRef, useEffect } from 'react';

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  currentX: number;
  currentY: number;
  velocityX: number;
  velocityY: number;
}

export default function InteractiveDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, radius: 200 });
  const dotsRef = useRef<Dot[]>([]);
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spacing = 24;
    // Darker, more visible gray that shows up well on #fafafa bg
    const dotColor = '#8b8fa3';
    const dotAlpha = 0.7;

    function initDots(w: number, h: number) {
      const dots: Dot[] = [];

      // Fill entire viewport with dots — no elliptical mask
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          dots.push({
            x, y,
            baseX: x,
            baseY: y,
            currentX: x,
            currentY: y,
            // Larger size range for more visibility
            size: 2.0 + Math.random() * 1.8,
            velocityX: 0,
            velocityY: 0,
          });
        }
      }
      dotsRef.current = dots;
    }

    function handleResize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      initDots(canvas!.width, canvas!.height);
    }

    function handleMouse(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function handleLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseleave', handleLeave);

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my, radius } = mouseRef.current;

      ctx.globalAlpha = dotAlpha;
      ctx.fillStyle = dotColor;

      for (const dot of dotsRef.current) {
        const dx = dot.currentX - mx;
        const dy = dot.currentY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius && dist > 0) {
          // Push away from cursor — stronger scatter with wider radius
          const force = Math.pow((radius - dist) / radius, 1.4);
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 28;
          const pushY = Math.sin(angle) * force * 28;

          dot.velocityX += (pushX - dot.velocityX) * 0.15;
          dot.velocityY += (pushY - dot.velocityY) * 0.15;
        } else {
          // Return to base with ~3-4 second smooth glide
          // Critically damped so dots glide back without oscillation
          dot.velocityX += (dot.baseX - dot.currentX) * 0.005;
          dot.velocityY += (dot.baseY - dot.currentY) * 0.005;
          dot.velocityX *= 0.94;
          dot.velocityY *= 0.94;
        }

        dot.currentX += dot.velocityX;
        dot.currentY += dot.velocityY;

        ctx.beginPath();
        ctx.arc(dot.currentX, dot.currentY, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      animIdRef.current = requestAnimationFrame(animate);
    }

    animIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // No mask — dots cover the entire background
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
