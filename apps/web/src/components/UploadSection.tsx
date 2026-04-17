import type { ChangeEvent } from 'react';

interface UploadSectionProps {
  cvId: string | null;
  isUploading: boolean;
  onSelectFile: (file: File | null) => void;
  onUpload: () => void;
}

const UploadSection = ({ cvId, isUploading, onSelectFile, onUpload }: UploadSectionProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    onSelectFile(selectedFile);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">1. Upload CV (PDF)</h2>
      <p className="mt-1 text-sm text-slate-600">Sube un CV con texto seleccionable.</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-700"
        />
        <button
          type="button"
          onClick={onUpload}
          disabled={isUploading}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isUploading ? 'Subiendo...' : 'Subir CV'}
        </button>
      </div>

      {cvId ? (
        <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">CV cargado. cvId: {cvId}</p>
      ) : null}
    </section>
  );
};

export default UploadSection;