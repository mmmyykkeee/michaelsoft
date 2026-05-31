"use client";

import React, { useRef, useEffect } from 'react';

interface Dot {
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
  const mouseRef = useRef({ x: -9999, y: -9999, radius: 120 });
  const dotsRef = useRef<Dot[]>([]);
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spacing = 18;
    const dotColor = '#374151';
    const dotAlpha = 0.9;

    function initDots(w: number, h: number) {
      const dots: Dot[] = [];
      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          dots.push({
            baseX: x,
            baseY: y,
            currentX: x,
            currentY: y,
            size: 0.8 + Math.random() * 0.7, // 0.8-1.5px — tiny dots
            velocityX: 0,
            velocityY: 0,
          });
        }
      }
      dotsRef.current = dots;
    }

    function handleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      initDots(w, h);
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
          // Gentle push away from cursor — subtle scatter, short travel
          const force = Math.pow((radius - dist) / radius, 1.4);
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 12;
          const pushY = Math.sin(angle) * force * 12;

          dot.velocityX += (pushX - dot.velocityX) * 0.1;
          dot.velocityY += (pushY - dot.velocityY) * 0.1;
        } else {
          // Slow drift back to base — takes ~10 seconds to fully settle
          dot.velocityX += (dot.baseX - dot.currentX) * 0.0003;
          dot.velocityY += (dot.baseY - dot.currentY) * 0.0003;
          dot.velocityX *= 0.99;
          dot.velocityY *= 0.99;
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
      className="fixed inset-0 top-0 left-0 w-screen h-screen z-0 pointer-events-none"
      style={{ display: 'block' }}
    />
  );
}
