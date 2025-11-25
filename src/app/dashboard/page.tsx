
import { Suspense } from 'react';
import { createServer } from '@/lib/supabase/server';
import { DashboardClient } from './dashboard-client';
import { Skeleton } from '@/components/ui/skeleton';

// A simple skeleton loader for the dashboard
function DashboardSkeleton() {
  return (
    <div className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="border rounded-lg p-4 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = createServer();

  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching appointments:', error);
    // You can render an error component here
    return <div>Error al cargar las citas.</div>;
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardClient appointments={appointments || []} />
    </Suspense>
  );
}

