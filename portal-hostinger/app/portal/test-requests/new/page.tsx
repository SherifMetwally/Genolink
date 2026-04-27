'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { clientApi } from '@/lib/client-api';

interface Patient   { id: number; first_name: string; last_name: string; }
interface TestItem  { id: number; name: string; category: string; }

export default function NewTestRequestPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const prefillId    = searchParams.get('patientId');

  const [patients,  setPatients]  = useState<Patient[]>([]);
  const [tests,     setTests]     = useState<TestItem[]>([]);
  const [patientId, setPatientId] = useState(prefillId || '');
  const [testId,    setTestId]    = useState('');
  const [notes,     setNotes]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  useEffect(() => {
    fetch(clientApi('patients')).then(r => r.json()).then(setPatients).catch(() => {});
    fetch(clientApi('test-catalog')).then(r => r.json()).then(setTests).catch(() => {});
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(clientApi('test-requests'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_id: Number(patientId), test_id: Number(testId), notes }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Failed to submit request'); return; }
      router.push('/portal/test-requests');
      router.refresh();
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/portal/test-requests" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-bold text-gray-900">New Test Request</h1>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm text-gray-500">Select patient and test to submit a request</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="patientId" className="text-sm font-medium text-gray-700">Patient *</label>
              <select
                id="patientId" value={patientId} onChange={e => setPatientId(e.target.value)} required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">Select patient…</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="testId" className="text-sm font-medium text-gray-700">Test *</label>
              <select
                id="testId" value={testId} onChange={e => setTestId(e.target.value)} required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">Select test…</option>
                {tests.map(t => (
                  <option key={t.id} value={t.id}>{t.name}{t.category ? ` (${t.category})` : ''}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700">Clinical notes</label>
              <textarea
                id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Optional notes for the lab…"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit Request'}</Button>
              <Link href="/portal/test-requests"><Button type="button" variant="secondary">Cancel</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

