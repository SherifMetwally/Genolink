'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { clientApi } from '@/lib/client-api';
import { formatDate } from '@/lib/utils';

interface StatusNote {
  id: number;
  status: string;
  note: string | null;
  created_at: string;
  created_by_name: string;
  created_by_role: string;
}

const STATUSES = ['pending', 'processing', 'completed', 'cancelled'];

export default function StatusNotesPanel({
  requestId,
  currentStatus,
  notes,
  canUpdate,
}: {
  requestId: number;
  currentStatus: string;
  notes: StatusNote[];
  canUpdate: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [addOnlyNote, setAddOnlyNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  async function handleStatusUpdate(e: FormEvent) {
    e.preventDefault();
    setMsg('');
    setBusy(true);
    try {
      const res = await fetch(clientApi(`test-requests/${requestId}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          note: note.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(data.message || 'Failed to update status');
        return;
      }
      setNote('');
      setMsg('Status updated');
      router.refresh();
    } catch {
      setMsg('Network error');
    } finally {
      setBusy(false);
    }
  }

  async function handleAddNote(e: FormEvent) {
    e.preventDefault();
    if (!addOnlyNote.trim()) return;
    setMsg('');
    setAddingNote(true);
    try {
      const res = await fetch(clientApi(`test-requests/${requestId}/notes`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: addOnlyNote.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(data.message || 'Failed to add note');
        return;
      }
      setAddOnlyNote('');
      setMsg('Note added');
      router.refresh();
    } catch {
      setMsg('Network error');
    } finally {
      setAddingNote(false);
    }
  }

  return (
    <div className="space-y-6">
      {canUpdate && (
        <>
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Update Status</h2>
              <p className="text-sm text-gray-500 mt-0.5">Note is optional. You can add many notes over time.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStatusUpdate} className="space-y-4">
                <div className="flex flex-col gap-1 max-w-xs">
                  <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                  <select
                    id="status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    required
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="note" className="text-sm font-medium text-gray-700">
                    Note <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="note"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    rows={3}
                    placeholder="Why was this status changed?"
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <Button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save status'}</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Add Note Only</h2>
              <p className="text-sm text-gray-500 mt-0.5">Attach another note without changing the current status.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddNote} className="space-y-4">
                <textarea
                  value={addOnlyNote}
                  onChange={e => setAddOnlyNote(e.target.value)}
                  rows={3}
                  required
                  placeholder="Additional note…"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <Button type="submit" variant="secondary" disabled={addingNote}>
                  {addingNote ? 'Adding…' : 'Add note'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}

      {msg && <p className="text-sm text-gray-600">{msg}</p>}

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Status Notes</h2>
          <p className="text-sm text-gray-500 mt-0.5">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
        </CardHeader>
        <CardContent className="p-0">
          {notes.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-gray-400">No status notes yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {notes.map(n => (
                <li key={n.id} className="px-6 py-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge status={n.status} />
                    <span className="text-xs text-gray-500">
                      {n.created_by_name} ({n.created_by_role}) · {formatDate(n.created_at)}
                    </span>
                  </div>
                  {n.note ? (
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{n.note}</p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Status changed with no note</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
