import { FormEvent, useMemo, useState } from 'react';

import Card from './ui/Card';

interface JobDescriptionSectionProps {
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: (jobDescription: string) => void;
}

const JobDescriptionSection = ({ disabled, isSubmitting, onSubmit }: JobDescriptionSectionProps) => {
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
          <h2 className="text-lg font-semibold text-slate-900">Job Description</h2>
          <p className="mt-1 text-sm text-slate-600">Pegá la descripción del puesto para evaluar el fit del CV.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Step 2</span>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Descripción del puesto</span>
          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            rows={9}
            placeholder="Responsabilidades, seniority, stack técnico y skills requeridas..."
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500">{charCount} caracteres</p>
          <button
            type="submit"
            disabled={disabled || isSubmitting}
            className="inline-flex min-w-44 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? 'Iniciando análisis…' : 'Iniciar análisis'}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default JobDescriptionSection;