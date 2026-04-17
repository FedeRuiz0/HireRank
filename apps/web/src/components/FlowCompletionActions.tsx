import { useI18n } from '../i18n/I18nProvider';
import Card from './ui/Card';

interface FlowCompletionActionsProps {
  onAnalyzeAnotherJob: () => void;
  onUploadAnotherCv: () => void;
}

const FlowCompletionActions = ({ onAnalyzeAnotherJob, onUploadAnotherCv }: FlowCompletionActionsProps) => {
  const { t } = useI18n();

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{t.completion.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{t.completion.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onAnalyzeAnotherJob}
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {t.completion.anotherJob}
          </button>

          <button
            type="button"
            onClick={onUploadAnotherCv}
            className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {t.completion.anotherCv}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default FlowCompletionActions;