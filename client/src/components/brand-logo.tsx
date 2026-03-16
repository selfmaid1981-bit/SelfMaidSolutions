interface LogoProps {
  variant?: 'primary' | 'icon' | 'horizontal';
  width?: number;
  className?: string;
  showTagline?: boolean;
}

export function BrandLogo({ variant = 'primary', width = 280, className = '', showTagline = true }: LogoProps) {
  if (variant === 'icon') return <LogoIcon width={width} className={className} />;
  if (variant === 'horizontal') return <LogoHorizontal width={width} className={className} showTagline={showTagline} />;
  return <LogoPrimary width={width} className={className} showTagline={showTagline} />;
}

function MascotIcon({ x, y, size }: { x: number; y: number; size: number }) {
  const s = size;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx={s/2} cy={s/2} r={s/2} fill="url(#mascotGrad)" />
      <ellipse cx={s*0.35} cy={s*0.38} rx={s*0.06} ry={s*0.08} fill="#1F2A37" />
      <ellipse cx={s*0.65} cy={s*0.38} rx={s*0.06} ry={s*0.08} fill="#1F2A37" />
      <ellipse cx={s*0.355} cy={s*0.36} rx={s*0.025} ry={s*0.03} fill="#fff" />
      <ellipse cx={s*0.655} cy={s*0.36} rx={s*0.025} ry={s*0.03} fill="#fff" />
      <path d={`M${s*0.35} ${s*0.55} Q${s*0.5} ${s*0.72} ${s*0.65} ${s*0.55}`} fill="none" stroke="#1F2A37" strokeWidth={s*0.03} strokeLinecap="round" />
      <circle cx={s*0.22} cy={s*0.48} r={s*0.06} fill="#FFB6C1" opacity="0.5" />
      <circle cx={s*0.78} cy={s*0.48} r={s*0.06} fill="#FFB6C1" opacity="0.5" />
      <rect x={s*0.15} y={s*0.05} width={s*0.12} height={s*0.04} rx={s*0.02} fill="#C6A969" transform={`rotate(-30, ${s*0.21}, ${s*0.07})`} />
      <rect x={s*0.72} y={s*0.02} width={s*0.15} height={s*0.04} rx={s*0.02} fill="#1E8E6A" transform={`rotate(20, ${s*0.8}, ${s*0.04})`} />
    </g>
  );
}

function SparkleSet({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <path d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z" fill="#C6A969" opacity="0.9" />
    </g>
  );
}

function LogoPrimary({ width, className, showTagline }: { width: number; className: string; showTagline: boolean }) {
  const h = showTagline ? width * 0.85 : width * 0.7;
  return (
    <svg width={width} height={h} viewBox="0 0 280 238" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mascotGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E8E6A" />
          <stop offset="100%" stopColor="#166d50" />
        </linearGradient>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1F2A37" />
          <stop offset="50%" stopColor="#1E8E6A" />
          <stop offset="100%" stopColor="#1F2A37" />
        </linearGradient>
      </defs>

      <MascotIcon x={105} y={10} size={70} />

      <SparkleSet x={88} y={28} scale={0.7} />
      <SparkleSet x={192} y={22} scale={0.5} />
      <SparkleSet x={200} y={55} scale={0.6} />

      <text x="140" y="118" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="36" fontWeight="900" fill="#1F2A37" letterSpacing="-1">
        Self-Maid
      </text>

      <text x="140" y="142" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fontWeight="700" fill="#1E8E6A" letterSpacing="4">
        CLEANING SOLUTIONS
      </text>

      <line x1="60" y1="152" x2="220" y2="152" stroke="url(#brandGrad)" strokeWidth="1.5" opacity="0.3" />

      {showTagline && (
        <text x="140" y="172" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="500" fill="#64748b" letterSpacing="1.5" fontStyle="italic">
          Bringing the Shine Since 2009
        </text>
      )}

      <rect x="54" y="186" width="172" height="40" rx="20" fill="none" stroke="#1F2A37" strokeWidth="1.5" opacity="0.1" />
      <text x="140" y="211" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="600" fill="#1F2A37" opacity="0.4" letterSpacing="2">
        TRUSTED · INSURED · PROFESSIONAL
      </text>
    </svg>
  );
}

function LogoIcon({ width, className }: { width: number; className: string }) {
  const size = width;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iconBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1F2A37" />
          <stop offset="100%" stopColor="#2a4256" />
        </linearGradient>
        <linearGradient id="mascotGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E8E6A" />
          <stop offset="100%" stopColor="#166d50" />
        </linearGradient>
      </defs>

      <rect width="80" height="80" rx="18" fill="url(#iconBg)" />

      <MascotIcon x={18} y={14} size={44} />

      <SparkleSet x={14} y={20} scale={0.5} />
      <SparkleSet x={66} y={16} scale={0.4} />
      <SparkleSet x={68} y={48} scale={0.5} />

      <text x="40" y="72" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fontWeight="900" fill="#fff" letterSpacing="-0.3">
        SM
      </text>
    </svg>
  );
}

function LogoHorizontal({ width, className, showTagline }: { width: number; className: string; showTagline: boolean }) {
  const h = showTagline ? width * 0.22 : width * 0.18;
  return (
    <svg width={width} height={h} viewBox="0 0 400 88" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mascotGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E8E6A" />
          <stop offset="100%" stopColor="#166d50" />
        </linearGradient>
      </defs>

      <MascotIcon x={8} y={10} size={50} />

      <SparkleSet x={4} y={18} scale={0.45} />
      <SparkleSet x={60} y={12} scale={0.35} />

      <text x="78" y="38" fontFamily="Georgia, 'Times New Roman', serif" fontSize="30" fontWeight="900" fill="#1F2A37" letterSpacing="-0.8">
        Self-Maid
      </text>

      <text x="78" y="56" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="700" fill="#1E8E6A" letterSpacing="3.5">
        CLEANING SOLUTIONS
      </text>

      {showTagline && (
        <text x="78" y="76" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9" fontWeight="500" fill="#64748b" letterSpacing="1" fontStyle="italic">
          Bringing the Shine Since 2009
        </text>
      )}

      <SparkleSet x={310} y={30} scale={0.5} />
    </svg>
  );
}
