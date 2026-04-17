import type { AnalysisStatus } from '../types/api';

interface StatusCardProps {
  analysisId: string | null;
  status: AnalysisStatus | null;
}

const statusStyles: Record<AnalysisStatus, string> = {
  pending: 'bg-amber-50 text-amber-700',
  processing: 'bg-blue-50 text-blue-700',
  completed: 'bg-emerald-50 text-emerald-700',
  failed: 'bg-rose-50 text-rose-700'
};

const StatusCard = ({ analysisId, status }: StatusCardProps) => {
  if (!analysisId || !status) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">3. Estado del análisis</h2>

      <div className="mt-4 flex flex-col gap-2 text-sm text-slate-700">
        <p>analysisId: {analysisId}</p>
        <span className={`w-fit rounded-full px-3 py-1 font-medium capitalize ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
    </section>
  );
};

export default StatusCard;