import ErrorView from './components/ErrorView';
import FlowCompletionActions from './components/FlowCompletionActions';
import JobDescriptionSection from './components/JobDescriptionSection';
import ResultsView from './components/ResultsView';
import StatusCard from './components/StatusCard';
import UploadSection from './components/UploadSection';
import { useAnalysisFlow } from './hooks/useAnalysisFlow';
import { useI18n } from './i18n/I18nProvider';

const App = () => {
  const {
    cvId,
    uploadedFileName,
    analysisId,
    status,
    result,
    analysisError,
    uiError,
    uiSuccess,
    isUploading,
    isStartingAnalysis,
    canStartAnalysis,
    handleSelectCvFile,
    handleUploadCv,
    handleStartAnalysis,
    resetForAnotherJob,
    resetForAnotherCv
  } = useAnalysisFlow();

  const { language, setLanguage, t } = useI18n();

  const showCompletionActions = status === 'completed' || status === 'failed';

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 md:px-8">
      <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[min(880px,90vw)] rounded-full bg-blue-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl space-y-8">
        <header className="rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-[0_8px_30px_rgb(15,23,42,0.06)] backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">{t.header.brand}</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{t.header.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">{t.header.subtitle}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/90 p-2">
              <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{t.languageSwitcher.label}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    language === 'es' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.languageSwitcher.es}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    language === 'en' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.languageSwitcher.en}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <UploadSection
            cvId={cvId}
            uploadedFileName={uploadedFileName}
            isUploading={isUploading}
            onSelectFile={handleSelectCvFile}
            onUpload={handleUploadCv}
          />

          <JobDescriptionSection
            disabled={!canStartAnalysis}
            isSubmitting={isStartingAnalysis}
            onSubmit={handleStartAnalysis}
          />
        </div>

        <StatusCard analysisId={analysisId} status={status} />

        {status === 'completed' && result ? <ResultsView result={result} /> : null}

        {status === 'failed' && analysisError ? <ErrorView message={analysisError.message} /> : null}

        {showCompletionActions ? (
          <FlowCompletionActions onAnalyzeAnotherJob={resetForAnotherJob} onUploadAnotherCv={resetForAnotherCv} />
        ) : null}

        {uiSuccess ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-sm">{uiSuccess}</div>
        ) : null}

        {uiError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">{uiError}</div>
        ) : null}
      </div>
    </main>
  );
};

export default App;