import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  active: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Overlay({ active, onClose, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active) {
      document.documentElement.classList.add('lock-scroll');
      document.body.classList.add('lock-scroll');
      closeRef.current?.focus();
      if (ref.current) ref.current.scrollTop = 0;
    } else {
      document.documentElement.classList.remove('lock-scroll');
      document.body.classList.remove('lock-scroll');
    }
    return () => {
      document.documentElement.classList.remove('lock-scroll');
      document.body.classList.remove('lock-scroll');
    };
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && active) onClose();
      if (e.key === 'Tab' && active && ref.current) {
        const focusables = ref.current.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300, overflowY: 'auto',
        background: '#050505',
        opacity: active ? 1 : 0,
        visibility: active ? 'visible' : 'hidden',
        pointerEvents: active ? 'auto' : 'none',
        transition: 'opacity .35s ease',
      }}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'fixed', top: 20, right: 24, width: 40, height: 40, borderRadius: 10,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.6)', transition: 'all .3s', zIndex: 310, cursor: 'pointer',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div style={{
        maxWidth: 760, margin: '0 auto', padding: '100px 32px 100px',
        transform: active ? 'translateY(0)' : 'translateY(12px)',
        transition: 'transform .4s cubic-bezier(0.19,1,0.22,1)',
      }}>
        {children}
      </div>
    </div>
  );
}
