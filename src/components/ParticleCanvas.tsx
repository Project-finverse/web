import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = window.innerWidth, H = window.innerHeight;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: W / 2, y: H / 2, active: false, last: 0 };

    interface Particle {
      t: number; x: number; y: number; vx: number; vy: number; phase: number; r: number;
    }
    let particles: Particle[] = [];
    let COUNT = W < 640 ? 46 : W < 1024 ? 80 : 130;

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W * DPR; canvas!.height = H * DPR;
      canvas!.style.width = W + 'px'; canvas!.style.height = H + 'px';
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function curvePoint(t: number) {
      const x = W * (0.06 + 0.88 * t);
      const eased = 1 - Math.pow(1 - t, 2.1);
      const y = H * (0.74 - 0.44 * eased) + Math.sin(t * Math.PI * 2.4) * (H * 0.018);
      return { x, y };
    }

    function makeParticles() {
      particles = [];
      for (let k = 0; k < COUNT; k++) {
        const t = k / (COUNT - 1);
        const base = curvePoint(t);
        particles.push({
          t, x: base.x + (Math.random() - 0.5) * 40, y: base.y + (Math.random() - 0.5) * 40,
          vx: 0, vy: 0, phase: Math.random() * Math.PI * 2, r: 1.1 + Math.random() * 1.6
        });
      }
    }

    function lerpColor(t: number) {
      const c1 = [124, 140, 255], c2 = [245, 185, 66];
      const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
      const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
      const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
      return `rgb(${r},${g},${b})`;
    }

    resize();
    makeParticles();

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; mouse.last = performance.now();
    };
    const onPointerLeave = () => { mouse.active = false; };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        COUNT = W < 640 ? 46 : W < 1024 ? 80 : 130;
        makeParticles();
      }, 200);
    };
    window.addEventListener('resize', onResize);

    let lastFrame = 0;
    let animId: number;

    function tick(now: number) {
      animId = requestAnimationFrame(tick);
      if (now - lastFrame < 16) return;
      lastFrame = now;

      if (mouse.active && now - mouse.last > 2200) mouse.active = false;

      ctx!.fillStyle = 'rgba(7,17,31,0.22)';
      ctx!.fillRect(0, 0, W, H);

      const time = now * 0.00035;
      for (let idx = 0; idx < particles.length; idx++) {
        const p = particles[idx];
        const target = curvePoint(p.t);
        const jitterX = Math.sin(time * 1.3 + p.phase) * 6;
        const jitterY = Math.cos(time * 1.1 + p.phase) * 6;
        const tx = target.x + jitterX, ty = target.y + jitterY;

        const dxm = mouse.x - p.x, dym = mouse.y - p.y;
        const distm = Math.sqrt(dxm * dxm + dym * dym);
        const radius = 170;

        if (mouse.active && distm < radius && distm > 0.01) {
          const strength = 1 - distm / radius;
          p.vx += (dxm / distm) * strength * 0.55;
          p.vy += (dym / distm) * strength * 0.55;
          p.vx += (-dym / distm) * strength * 0.35;
          p.vy += (dxm / distm) * strength * 0.35;
        } else {
          p.vx += (tx - p.x) * 0.02;
          p.vy += (ty - p.y) * 0.02;
        }
        p.vx *= 0.9; p.vy *= 0.9;
        p.x += p.vx; p.y += p.vy;

        ctx!.beginPath();
        ctx!.fillStyle = lerpColor(p.t);
        ctx!.globalAlpha = 0.85;
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.lineWidth = 1;
      for (let j = 0; j < particles.length - 1; j++) {
        const a = particles[j], b = particles[j + 1];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          ctx!.strokeStyle = `rgba(150,165,255,${0.16 * (1 - d / 90)})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }
    }

    if (!prefersReduced) {
      animId = requestAnimationFrame(tick);
    } else {
      ctx.fillStyle = 'rgba(7,17,31,1)';
      ctx.fillRect(0, 0, W, H);
      particles.forEach(p => {
        const pt = curvePoint(p.t);
        ctx!.beginPath();
        ctx!.fillStyle = lerpColor(p.t);
        ctx!.globalAlpha = 0.7;
        ctx!.arc(pt.x, pt.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      });
      ctx.globalAlpha = 1;
    }

    const onVisibility = () => {
      if (document.hidden) lastFrame = Infinity; else lastFrame = 0;
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
