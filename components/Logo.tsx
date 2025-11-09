'use client';

import { useState } from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback to emoji if image doesn't exist
    return (
      <div className={`text-8xl md:text-9xl ${className}`}>
        🧬
      </div>
    );
  }

  return (
    <div className={`relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center ${className}`}>
      <img
        src="/logo.png"
        alt="GenoLink Logo"
        className="w-full h-full object-contain"
        onError={() => setImageError(true)}
        onLoad={() => setImageError(false)}
      />
    </div>
  );
}

