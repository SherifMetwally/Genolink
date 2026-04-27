'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { clientApi } from '@/lib/client-api';

export default function NewPatientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const [form, setForm] = useState({
    first_name: '', last_name: '', dob: '',
    gender: '', contact_email: '', contact_phone: '', notes: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(clientApi('patients'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Failed to create patient'); return; }
      router.push('/patients');
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
        <Link href="/patients" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm text-gray-500">Patient demographic information</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input id="first_name" name="first_name" label="First name *" value={form.first_name} onChange={handleChange} required />
              <Input id="last_name"  name="last_name"  label="Last name *"  value={form.last_name}  onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input id="dob" name="dob" label="Date of birth" type="date" value={form.dob} onChange={handleChange} />
              <div className="flex flex-col gap-1">
                <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender" name="gender" value={form.gender} onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select…</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input id="contact_email" name="contact_email" label="Contact email" type="email" value={form.contact_email} onChange={handleChange} />
              <Input id="contact_phone" name="contact_phone" label="Contact phone" type="tel"   value={form.contact_phone} onChange={handleChange} />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes</label>
              <textarea
                id="notes" name="notes" value={form.notes} onChange={handleChange} rows={3}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Optional clinical notes…"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Create Patient'}</Button>
              <Link href="/patients"><Button type="button" variant="secondary">Cancel</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
