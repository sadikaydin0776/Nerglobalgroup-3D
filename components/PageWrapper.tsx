'use client';

import { useState } from 'react';
import { Loader } from './Loader';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s',
          overflowX: 'hidden',
          width: '100%',
        }}
      >
        {children}
      </div>
    </>
  );
}
