import { FormEvent, useState } from 'react';

interface JobDescriptionSectionProps {
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: (jobDescription: string) => void;
}

const JobDescriptionSection = ({ disabled, isSubmitting, onSubmit }: JobDescriptionSectionProps) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(jobDescription);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">2. Job Description</h2>
      <p className="mt-1 text-sm text-slate-600">Pega la descripción del puesto y lanza el análisis.</p>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          rows={8}
          placeholder="Describe el puesto, responsabilidades y skills requeridas"
          className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-800 outline-none ring-brand-600 transition focus:ring-2"
        />

        <button
          type="submit"
          disabled={disabled || isSubmitting}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? 'Iniciando análisis...' : 'Iniciar análisis'}
        </button>
      </form>
    </section>
  );
};

export default JobDescriptionSection;