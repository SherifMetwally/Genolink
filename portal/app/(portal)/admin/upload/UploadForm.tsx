'use client';

import { useState, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Upload } from 'lucide-react';
import { clientApi } from '@/lib/client-api';

interface TestRequest {
  id: number;
  first_name: string;
  last_name: string;
  test_name: string;
  status: string;
}

export default function UploadForm({ requests }: { requests: TestRequest[] }) {
  const router     = useRouter();
  const fileRef    = useRef<HTMLInputElement>(null);
  const [reqId,    setReqId]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [message,  setMessage]  = useState('');
  const [error,    setError]    = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setMessage('');
    if (!reqId || !fileRef.current?.files?.[0]) {
      setError('Please select a request and a PDF file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('report', fileRef.current.files[0]);

    try {
      const res = await fetch(clientApi(`reports/${reqId}`), {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Upload failed'); return; }
      setMessage('Report uploaded successfully. Test status set to completed.');
      setReqId('');
      if (fileRef.current) fileRef.current.value = '';
      router.refresh();
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold text-gray-900">Upload PDF Report</h2>
        <p className="text-sm text-gray-500 mt-0.5">Select a test request and upload the PDF. Status will be set to Completed automatically.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="reqId" className="text-sm font-medium text-gray-700">Test Request *</label>
            <select
              id="reqId" value={reqId} onChange={e => setReqId(e.target.value)} required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select request…</option>
              {requests.map(r => (
                <option key={r.id} value={r.id}>
                  #{r.id} — {r.first_name} {r.last_name} — {r.test_name} ({r.status})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="file" className="text-sm font-medium text-gray-700">PDF Report *</label>
            <input
              id="file" type="file" accept="application/pdf" ref={fileRef} required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
            />
            <p className="text-xs text-gray-400">Max 20 MB</p>
          </div>

          {error   && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
          {message && <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">{message}</div>}

          <Button type="submit" disabled={loading}>
            <Upload size={16} />
            {loading ? 'Uploading…' : 'Upload Report'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
