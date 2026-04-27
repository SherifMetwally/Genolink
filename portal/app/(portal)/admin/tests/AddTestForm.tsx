'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { clientApi } from '@/lib/client-api';

export default function AddTestForm() {
  const router = useRouter();
  const [name,        setName]        = useState('');
  const [category,    setCategory]    = useState('');
  const [description, setDescription] = useState('');
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(clientApi('admin/test-catalog'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, description }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Failed to add test'); return; }
      setName(''); setCategory(''); setDescription('');
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
        <h2 className="font-semibold text-gray-900">Add New Test</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[180px]">
            <Input id="test-name"     label="Test name *"  value={name}        onChange={e => setName(e.target.value)}        required />
          </div>
          <div className="flex-1 min-w-[140px]">
            <Input id="test-category" label="Category"     value={category}    onChange={e => setCategory(e.target.value)} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input id="test-desc"     label="Description"  value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Adding…' : 'Add Test'}</Button>
        </form>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </CardContent>
    </Card>
  );
}
