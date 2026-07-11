'use client';

import { useId } from 'react';

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
  const id = useId().replace(/:/g, '_');

  return (
    <div
      aria-hidden="true"
      style={{
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : 'none',
        marginTop: '-1px',
        marginBottom: '-1px',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1440 56"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '56px' }}
      >
        <path
          d="M0,0 C360,56 720,56 1080,28 C1260,14 1380,0 1440,8 L1440,56 L0,56 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
