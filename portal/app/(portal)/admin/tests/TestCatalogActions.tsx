'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { clientApi } from '@/lib/client-api';

export default function TestCatalogActions({ testId, isActive }: { testId: number; isActive: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    await fetch(clientApi(`admin/test-catalog/${testId}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !isActive }),
    });
    router.refresh();
    setBusy(false);
  }

  return (
    <Button variant={isActive ? 'ghost' : 'secondary'} size="sm" onClick={toggle} disabled={busy}>
      {isActive ? 'Deactivate' : 'Activate'}
    </Button>
  );
}
