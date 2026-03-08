import { AnalyticsCards, ReportFilters, ReportTable } from '@/components/reports';

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Reports</h1>
      <ReportFilters />
      <AnalyticsCards />
      <ReportTable />
    </div>
  );
}
