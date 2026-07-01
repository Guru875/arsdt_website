import React from 'react';

export const SnowflakeIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="m20 16-4-4 4-4" />
    <path d="m4 8 4 4-4 4" />
    <path d="m16 4-4 4-4-4" />
    <path d="m8 20 4-4 4 4" />
    <path d="m7.5 7.5 9 9" />
    <path d="m16.5 7.5-9 9" />
  </svg>
);

export const WasherIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="20" x="3" y="2" rx="2" ry="2" />
    <circle cx="12" cy="13" r="5" />
    <path d="M12 10a3 3 0 0 0 0 6" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="10" y1="6" x2="14" y2="6" />
  </svg>
);

export const ZapIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const CheckIcon = ({ size = 16, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ClockIcon = ({ size = 18, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const ChevronDownIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const BookIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10M6 10h10M6 14h10" strokeWidth="1.5" />
  </svg>
);

export const PlayIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const TvIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </svg>
);

export const CpuIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
);

export function CourseIcon({ name, size = 24, className = '' }) {
  switch (name) {
    case 'snowflake':
      return <SnowflakeIcon size={size} className={className} />;
    case 'washer':
      return <WasherIcon size={size} className={className} />;
    case 'tv':
      return <TvIcon size={size} className={className} />;
    case 'cpu':
      return <CpuIcon size={size} className={className} />;
    case 'zap':
    default:
      return <ZapIcon size={size} className={className} />;
  }
}

export const PracticalIcon = ({ size = 32, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animated-practical-icon ${className}`}
  >
    {/* Rotating Gear */}
    <g className="animated-gear" style={{ transformOrigin: '12px 12px' }}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" />
    </g>
    {/* Wrench that pivots/wiggles */}
    <g className="animated-wrench" style={{ transformOrigin: '6px 18px' }}>
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77Z"
        fill="var(--secondary)"
        stroke="var(--secondary)"
        strokeWidth="1"
      />
    </g>
  </svg>
);

export const ExpertTrainersIcon = ({ size = 32, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animated-trainers-icon ${className}`}
  >
    {/* Board/Screen */}
    <rect x="13" y="3" width="9" height="7" rx="1" stroke="var(--secondary)" strokeWidth="2" />
    <path d="M17.5 10v2M15 12h5" stroke="var(--secondary)" strokeWidth="1.5" />
    
    {/* Instructor */}
    <g className="animated-instructor" style={{ transformOrigin: '9px 21px' }}>
      <path d="M14 21v-1.5a2.5 2.5 0 0 0-2.5-2.5h-5a2.5 2.5 0 0 0-2.5 2.5v1.5" />
      <circle cx="9" cy="8" r="3.5" />
      {/* Wrench held by instructor */}
      <path d="M4 12l2 2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 13l2-2" stroke="currentColor" strokeWidth="2" />
    </g>

    {/* Sparkle/Glow */}
    <path
      className="animated-sparkle"
      d="M19 15.5l.5 1.25 1.25.5-1.25.5-.5 1.25-.5-1.25-1.25-.5 1.25-.5z"
      fill="var(--secondary)"
      stroke="none"
      style={{ transformOrigin: '19.5px 17.5px' }}
    />
  </svg>
);

export const CertificationIcon = ({ size = 32, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animated-certification-icon ${className}`}
  >
    {/* Certificate Document Border */}
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    
    {/* Decorative Certificate Lines */}
    <path d="M7 8h10M7 11h6" stroke="currentColor" strokeWidth="1.5" className="animated-cert-line" strokeDasharray="24" strokeDashoffset="0" />
    
    {/* Golden Seal Badge */}
    <circle cx="16" cy="14" r="3" fill="var(--secondary)" stroke="var(--secondary)" strokeWidth="1" className="animated-seal" />
    
    {/* Seal Ribbon */}
    <path d="M15 16l-1 4 2-1 2 1-1-4" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animated-ribbon" style={{ transformOrigin: '16px 14px' }} />
  </svg>
);

export const PlacementIcon = ({ size = 32, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animated-placement-icon ${className}`}
  >
    {/* Briefcase */}
    <rect x="4" y="9" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M9 9V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
    
    {/* Rising Job Growth Trend */}
    <path className="animated-trend-line" d="M7 16l3-3 3 2 5-5" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path className="animated-trend-arrow" d="M15 10h3v3" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LifetimeAccessIcon = ({ size = 32, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animated-lifetime-icon ${className}`}
  >
    {/* Screen/Monitor */}
    <rect x="3" y="3" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M12 16v4M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    
    {/* Infinity Symbol inside screen representing "Lifetime" */}
    <path
      className="animated-infinity"
      d="M7 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3c1.5 0 2.5-1.5 3.5-3s2-3 3.5-3a3 3 0 0 1 3 3 3 3 0 0 1-3 3c-1.5 0-2.5-1.5-3.5-3s-2-3-3.5-3Z"
      stroke="var(--secondary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      style={{ transformOrigin: '12px 12px' }}
    />
  </svg>
);

export const SmallBatchesIcon = ({ size = 32, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animated-batches-icon ${className}`}
  >
    {/* Dotted limit ring in background */}
    <circle cx="12" cy="12" r="10" stroke="var(--secondary)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" className="animated-ring" style={{ transformOrigin: '12px 12px' }} />

    {/* Avatars */}
    {/* Central Student/Trainer */}
    <g className="avatar-mid" style={{ transformOrigin: '12px 19px' }}>
      <path d="M12 14a3 3 0 0 0-3 3v2h6v-2a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="2" />
    </g>
    
    {/* Left Student */}
    <g className="avatar-left" style={{ transformOrigin: '6px 19px' }}>
      <path d="M6 15a2 2 0 0 0-2 2v2h4v-2a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </g>
    
    {/* Right Student */}
    <g className="avatar-right" style={{ transformOrigin: '18px 19px' }}>
      <path d="M18 15a2 2 0 0 0-2 2v2h4v-2a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </g>
  </svg>
);

