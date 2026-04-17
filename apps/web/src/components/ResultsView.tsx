import type { AnalysisResultPayload } from '../types/api';

interface ResultsViewProps {
  result: AnalysisResultPayload;
}

const TagList = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="mb-2 text-sm font-semibold text-slate-800">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {items.length > 0 ? (
        items.map((item) => (
          <span key={`${title}-${item}`} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
            {item}
          </span>
        ))
      ) : (
        <span className="text-sm text-slate-500">Sin datos</span>
      )}
    </div>
  </div>
);

const BulletList = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="mb-2 text-sm font-semibold text-slate-800">{title}</h4>
    {items.length > 0 ? (
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
        {items.map((item) => (
          <li key={`${title}-${item}`}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-slate-500">Sin datos</p>
    )}
  </div>
);

const ResultsView = ({ result }: ResultsViewProps) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">4. Resultado</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-600">Overall score</p>
          <p className="text-3xl font-bold text-slate-900">{result.summary.overall_score}</p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-600">Match level</p>
          <p className="text-3xl font-bold capitalize text-slate-900">{result.summary.match_level}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        <TagList title="Matched skills" items={result.skills.matched} />
        <TagList title="Missing skills" items={result.skills.missing} />
        <TagList title="Partial skills" items={result.skills.partial} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <BulletList title="Strengths" items={result.feedback.strengths} />
        <BulletList title="Weaknesses" items={result.feedback.weaknesses} />
        <BulletList title="Recommendations" items={result.feedback.recommendations} />
      </div>
    </section>
  );
};

export default ResultsView;