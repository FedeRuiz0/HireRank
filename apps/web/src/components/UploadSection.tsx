import type { ChangeEvent } from 'react';

import { useI18n } from '../i18n/I18nProvider';
import Card from './ui/Card';

interface UploadSectionProps {
  cvId: string | null;
  uploadedFileName: string | null;
  isUploading: boolean;
  onSelectFile: (file: File | null) => void;
  onUpload: () => void;
}

const UploadSection = ({
  cvId,
  uploadedFileName,
  isUploading,
  onSelectFile,
  onUpload
}: UploadSectionProps) => {
  const { t } = useI18n();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    onSelectFile(selectedFile);
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{t.upload.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{t.upload.subtitle}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{t.upload.step}</span>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">{t.upload.fileLabel}</span>
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
        />
      </label>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={onUpload}
          disabled={isUploading}
          className="inline-flex min-w-32 items-center justify-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isUploading ? t.upload.uploadingButton : t.upload.uploadButton}
        </button>
        <p className="text-xs text-slate-500">{t.upload.formatHint}</p>
      </div>

      {cvId ? (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800">
          <p className="font-medium">{t.upload.readyTitle}</p>
          <p className="mt-1 text-xs text-emerald-700">
            {t.upload.fileName}: {uploadedFileName ?? t.upload.fallbackFileName}
          </p>
          <p className="mt-1 text-xs text-emerald-700">
            {t.upload.cvId}: {cvId}
          </p>
        </div>
      ) : null}
    </Card>
  );
};

export default UploadSection;