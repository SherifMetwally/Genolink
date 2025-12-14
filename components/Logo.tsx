'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

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
      <Image
        src={getImagePath('logo.png')}
        alt="GenoLink Logo"
        fill
        className="object-contain"
        onError={() => setImageError(true)}
        unoptimized
      />
    </div>
  );
}

