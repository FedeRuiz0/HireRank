import { FormEvent, useMemo, useState } from 'react';

import { useI18n } from '../i18n/I18nProvider';
import Card from './ui/Card';

interface JobDescriptionSectionProps {
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: (jobDescription: string) => void;
}

const JobDescriptionSection = ({ disabled, isSubmitting, onSubmit }: JobDescriptionSectionProps) => {
  const { t } = useI18n();
  const [jobDescription, setJobDescription] = useState('');

  const charCount = useMemo(() => jobDescription.trim().length, [jobDescription]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(jobDescription);
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{t.job.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{t.job.subtitle}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{t.job.step}</span>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">{t.job.label}</span>
          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            rows={9}
            placeholder={t.job.placeholder}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            {charCount} {t.job.charCount}
          </p>
          <button
            type="submit"
            disabled={disabled || isSubmitting}
            className="inline-flex min-w-44 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? t.job.submittingButton : t.job.submitButton}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default JobDescriptionSection;