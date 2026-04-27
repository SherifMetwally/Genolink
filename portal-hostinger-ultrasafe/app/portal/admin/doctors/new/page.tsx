'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { clientApi } from '@/lib/client-api';

export default function NewDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    license_number: '', specialty: '', phone: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(clientApi('admin/doctors'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Failed to create doctor'); return; }
      router.push('/portal/admin/doctors');
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
        <Link href="/portal/admin/doctors" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-bold text-gray-900">Add Doctor Account</h1>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm text-gray-500">Create a new physician account. The doctor can change their password after first login.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="name"     name="name"     label="Full name *"      value={form.name}     onChange={handleChange} required />
            <Input id="email"    name="email"    label="Email *"          type="email" value={form.email}    onChange={handleChange} required />
            <Input id="password" name="password" label="Temporary password *" type="password" value={form.password} onChange={handleChange} required minLength={8} />

            <hr className="border-gray-100" />

            <div className="grid grid-cols-2 gap-4">
              <Input id="license_number" name="license_number" label="License number" value={form.license_number} onChange={handleChange} />
              <Input id="specialty"      name="specialty"      label="Specialty"      value={form.specialty}      onChange={handleChange} />
            </div>
            <Input id="phone" name="phone" label="Phone" type="tel" value={form.phone} onChange={handleChange} />

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create Doctor'}</Button>
              <Link href="/portal/admin/doctors"><Button type="button" variant="secondary">Cancel</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

