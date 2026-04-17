import ErrorView from './components/ErrorView';
import JobDescriptionSection from './components/JobDescriptionSection';
import ResultsView from './components/ResultsView';
import StatusCard from './components/StatusCard';
import UploadSection from './components/UploadSection';
import { useAnalysisFlow } from './hooks/useAnalysisFlow';

const App = () => {
  const {
    cvId,
    analysisId,
    status,
    result,
    analysisError,
    uiError,
    isUploading,
    isStartingAnalysis,
    canStartAnalysis,
    handleSelectCvFile,
    handleUploadCv,
    handleStartAnalysis
  } = useAnalysisFlow();

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">HireRank MVP</h1>
        <p className="mt-2 text-slate-600">Analiza tu CV contra una descripción de puesto en minutos.</p>
      </header>

      <div className="space-y-6">
        <UploadSection
          cvId={cvId}
          isUploading={isUploading}
          onSelectFile={handleSelectCvFile}
          onUpload={handleUploadCv}
        />

        <JobDescriptionSection
          disabled={!canStartAnalysis}
          isSubmitting={isStartingAnalysis}
          onSubmit={handleStartAnalysis}
        />

        <StatusCard analysisId={analysisId} status={status} />

        {status === 'completed' && result ? <ResultsView result={result} /> : null}

        {status === 'failed' && analysisError ? <ErrorView message={analysisError.message} /> : null}

        {uiError ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{uiError}</div>
        ) : null}
      </div>
    </main>
  );
};

export default App;