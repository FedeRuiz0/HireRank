import type { AnalysisStatus } from '../types/api';
import Card from './ui/Card';

interface StatusCardProps {
  analysisId: string | null;
  status: AnalysisStatus | null;
}

const statusConfig: Record<AnalysisStatus, { badge: string; text: string; isRunning?: boolean }> = {
  pending: {
    badge: 'bg-amber-100 text-amber-700 ring-amber-200',
    text: 'En cola. El análisis será tomado por el worker en breve.',
    isRunning: true
  },
  processing: {
    badge: 'bg-blue-100 text-blue-700 ring-blue-200',
    text: 'Procesando CV y descripción del puesto.',
    isRunning: true
  },
  completed: {
    badge: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    text: 'Análisis completado correctamente.'
  },
  failed: {
    badge: 'bg-rose-100 text-rose-700 ring-rose-200',
    text: 'El análisis finalizó con error.'
  }
};

const StatusCard = ({ analysisId, status }: StatusCardProps) => {
  if (!analysisId || !status) {
    return null;
  }

  const selectedStatus = statusConfig[status];

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Analysis Status</h2>
          <p className="mt-1 text-sm text-slate-600">Seguimiento en tiempo real del procesamiento.</p>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${selectedStatus.badge}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-slate-500">analysisId</p>
        <p className="mt-1 break-all text-sm font-medium text-slate-700">{analysisId}</p>
        <p className="mt-3 text-sm text-slate-600">{selectedStatus.text}</p>

        {selectedStatus.isRunning ? (
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs text-slate-600 ring-1 ring-slate-200">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            Esperando respuesta del análisis...
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default StatusCard;