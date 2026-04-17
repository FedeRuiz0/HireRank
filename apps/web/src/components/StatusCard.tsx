import type { AnalysisStatus } from '../types/api';
import { useI18n } from '../i18n/I18nProvider';
import Card from './ui/Card';

interface StatusCardProps {
  analysisId: string | null;
  status: AnalysisStatus | null;
}

const StatusCard = ({ analysisId, status }: StatusCardProps) => {
  const { t } = useI18n();

  if (!analysisId || !status) {
    return null;
  }

  const statusConfig: Record<AnalysisStatus, { badge: string; text: string; isRunning?: boolean; label: string }> = {
    pending: {
      badge: 'bg-amber-100 text-amber-700 ring-amber-200',
      text: t.status.pendingText,
      isRunning: true,
      label: t.status.pendingLabel
    },
    processing: {
      badge: 'bg-blue-100 text-blue-700 ring-blue-200',
      text: t.status.processingText,
      isRunning: true,
      label: t.status.processingLabel
    },
    completed: {
      badge: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
      text: t.status.completedText,
      label: t.status.completedLabel
    },
    failed: {
      badge: 'bg-rose-100 text-rose-700 ring-rose-200',
      text: t.status.failedText,
      label: t.status.failedLabel
    }
  };

  const selectedStatus = statusConfig[status];

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{t.status.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{t.status.subtitle}</p>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${selectedStatus.badge}`}
        >
          {selectedStatus.label}
        </span>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-slate-500">{t.status.analysisId}</p>
        <p className="mt-1 break-all text-sm font-medium text-slate-700">{analysisId}</p>
        <p className="mt-3 text-sm text-slate-600">{selectedStatus.text}</p>

        {selectedStatus.isRunning ? (
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs text-slate-600 ring-1 ring-slate-200">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            {t.status.waiting}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default StatusCard;