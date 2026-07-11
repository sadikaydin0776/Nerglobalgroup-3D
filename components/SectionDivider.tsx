interface SectionDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
}

export function SectionDivider({
  fromColor = '#04090F',
  toColor = '#07111F',
  flip = false,
}: SectionDividerProps) {
  return (
    <div
      style={{
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : 'none',
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '60px' }}
      >
        <defs>
          <linearGradient id="divGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <path
          d="M0,0 C240,60 480,60 720,30 C960,0 1200,0 1440,40 L1440,60 L0,60 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
