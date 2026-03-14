'use client';

import AuthGuard from '@/components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </AuthGuard>
  );
}