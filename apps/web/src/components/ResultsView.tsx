import type { AnalysisResultPayload } from '../types/api';
import Card from './ui/Card';

interface ResultsViewProps {
  result: AnalysisResultPayload;
}

const tagStyles = {
  matched: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  missing: 'bg-rose-50 text-rose-700 border-rose-200',
  partial: 'bg-amber-50 text-amber-700 border-amber-200'
} as const;

const TagGroup = ({
  title,
  items,
  variant
}: {
  title: string;
  items: string[];
  variant: keyof typeof tagStyles;
}) => (
  <div>
    <h4 className="mb-2 text-sm font-semibold text-slate-800">{title}</h4>
    <div className="flex min-h-9 flex-wrap gap-2">
      {items.length > 0 ? (
        items.map((item) => (
          <span
            key={`${title}-${item}`}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${tagStyles[variant]}`}
          >
            {item}
          </span>
        ))
      ) : (
        <span className="text-sm text-slate-500">Sin datos</span>
      )}
    </div>
  </div>
);

const FeedbackList = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
    {items.length > 0 ? (
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {items.map((item) => (
          <li key={`${title}-${item}`}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="mt-2 text-sm text-slate-500">Sin datos</p>
    )}
  </div>
);

const ResultsView = ({ result }: ResultsViewProps) => {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Analysis Results</h2>
          <p className="mt-1 text-sm text-slate-600">Resumen de compatibilidad entre CV y vacante.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Step 4</span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr,1fr]">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white">
          <p className="text-xs uppercase tracking-wide text-slate-300">Overall Score</p>
          <p className="mt-2 text-5xl font-semibold leading-none">{result.summary.overall_score}</p>
          <p className="mt-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
            {result.summary.match_level}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs uppercase tracking-wide text-slate-500">Scoring Version</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{result.metadata.scoring_version}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Este resultado se genera en base al matching actual del MVP y puede evolucionar en próximas iteraciones.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <TagGroup title="Matched skills" items={result.skills.matched} variant="matched" />
        <TagGroup title="Missing skills" items={result.skills.missing} variant="missing" />
        <TagGroup title="Partial skills" items={result.skills.partial} variant="partial" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <FeedbackList title="Strengths" items={result.feedback.strengths} />
        <FeedbackList title="Weaknesses" items={result.feedback.weaknesses} />
        <FeedbackList title="Recommendations" items={result.feedback.recommendations} />
      </div>
    </Card>
  );
};

export default ResultsView;