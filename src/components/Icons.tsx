interface IconProps {
  type: string;
  size?: number;
}

export function ModuleIcon({ type, size = 22 }: IconProps) {
  const s = { width: size, height: size, stroke: 'currentColor', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'card':
      return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="7" width="18" height="12" rx="3" /><path d="M3 10.5h18" /><circle cx="16.5" cy="14.5" r="1.1" fill="currentColor" stroke="none" /></svg>;
    case 'bank':
      return <svg viewBox="0 0 24 24" {...s}><path d="M12 3l9 5H3l9-5z" /><path d="M4 10v8M9 10v8M15 10v8M20 10v8M3 20h18" /></svg>;
    case 'chart':
      return <svg viewBox="0 0 24 24" {...s}><path d="M4 16l6-6 4 4 6-8" /><path d="M14 6h6v6" /></svg>;
    case 'doc':
      return <svg viewBox="0 0 24 24" {...s}><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v3h3M9 11h6M9 15h6" /></svg>;
    case 'shield':
      return <svg viewBox="0 0 24 24" {...s}><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case 'rocket':
      return <svg viewBox="0 0 24 24" {...s}><path d="M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-1 2-1-2h-2l-1 2-1-2c-1-1-2-3-2-5 0-4 2-8 5-10z" /><circle cx="12" cy="10" r="1.5" /><path d="M8 17l-2 3M16 17l2 3" /></svg>;
    case 'coins':
      return <svg viewBox="0 0 24 24" {...s}><ellipse cx="12" cy="6" rx="7" ry="2.4" /><path d="M5 6v6c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4V6" /><path d="M5 12v6c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4v-6" /></svg>;
    case 'calc':
      return <svg viewBox="0 0 24 24" {...s}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7.5h8" /><circle cx="8.6" cy="12" r=".9" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none" /><circle cx="15.4" cy="12" r=".9" fill="currentColor" stroke="none" /><circle cx="8.6" cy="16" r=".9" fill="currentColor" stroke="none" /><circle cx="12" cy="16" r=".9" fill="currentColor" stroke="none" /><circle cx="15.4" cy="16" r=".9" fill="currentColor" stroke="none" /></svg>;
    case 'target':
      return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4.3" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></svg>;
    case 'percent':
      return <svg viewBox="0 0 24 24" {...s}><circle cx="7.5" cy="7.5" r="2.3" /><circle cx="16.5" cy="16.5" r="2.3" /><path d="M6 18L18 6" /></svg>;
    case 'briefcase':
      return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></svg>;
    case 'umbrella':
      return <svg viewBox="0 0 24 24" {...s}><path d="M12 3c5 0 9 4 9 8H3c0-4 4-8 9-8z" /><path d="M12 3v15a2.5 2.5 0 0 1-4 2" /></svg>;
    default:
      return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="8" /></svg>;
  }
}

export function ChevronRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform .3s cubic-bezier(.19,.8,.2,1)' }}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
