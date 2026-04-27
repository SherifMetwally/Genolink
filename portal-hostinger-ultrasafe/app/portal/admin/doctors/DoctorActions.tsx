'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { clientApi } from '@/lib/client-api';

export default function DoctorActions({ doctorId, isActive }: { doctorId: number; isActive: boolean }) {
  const router  = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    await fetch(clientApi(`admin/doctors/${doctorId}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !isActive }),
    });
    router.refresh();
    setBusy(false);
  }

  return (
    <Button
      variant={isActive ? 'danger' : 'secondary'}
      size="sm"
      onClick={toggle}
      disabled={busy}
    >
      {isActive ? 'Disable' : 'Enable'}
    </Button>
  );
}
