import { useEffect, useMemo, useState } from 'react';

import { getAnalysisResult, startAnalysis, uploadCv } from '../services/api';
import type { AnalysisResultPayload, AnalysisStatus, ResultError } from '../types/api';

const POLL_INTERVAL_MS = 2000;

export const useAnalysisFlow = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvId, setCvId] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus | null>(null);
  const [result, setResult] = useState<AnalysisResultPayload | null>(null);
  const [analysisError, setAnalysisError] = useState<ResultError | null>(null);
  const [uiError, setUiError] = useState<string | null>(null);
  const [uiSuccess, setUiSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isStartingAnalysis, setIsStartingAnalysis] = useState(false);

  const canStartAnalysis = useMemo(() => Boolean(cvId), [cvId]);

  const handleSelectCvFile = (file: File | null) => {
    setCvFile(file);
    setUiError(null);
    setUiSuccess(null);
  };

  const resetForAnotherJob = () => {
    setAnalysisId(null);
    setStatus(null);
    setResult(null);
    setAnalysisError(null);
    setUiError(null);
    setUiSuccess('Puedes analizar otra vacante con el mismo CV.');
  };

  const resetForAnotherCv = () => {
    setCvFile(null);
    setCvId(null);
    setUploadedFileName(null);
    setAnalysisId(null);
    setStatus(null);
    setResult(null);
    setAnalysisError(null);
    setUiError(null);
    setUiSuccess('Listo para subir un nuevo CV.');
  };

  const handleUploadCv = async () => {
    if (!cvFile) {
      setUiError('Selecciona un archivo PDF antes de subirlo.');
      return;
    }

    setIsUploading(true);
    setUiError(null);
    setUiSuccess(null);

    try {
      const response = await uploadCv(cvFile);
      setCvId(response.cvId);
      setUploadedFileName(cvFile.name);
      setStatus(null);
      setAnalysisId(null);
      setResult(null);
      setAnalysisError(null);
      setUiSuccess('CV subido correctamente. Ya puedes iniciar el análisis.');
    } catch (error) {
      setUiError(error instanceof Error ? error.message : 'No se pudo subir el CV');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartAnalysis = async (jobDescription: string) => {
    if (!cvId) {
      setUiError('Primero sube un CV válido.');
      return;
    }

    setIsStartingAnalysis(true);
    setUiError(null);
    setUiSuccess(null);
    setResult(null);
    setAnalysisError(null);

    try {
      const response = await startAnalysis({ cvId, jobDescription });
      setAnalysisId(response.analysisId);
      setStatus(response.status);
      setUiSuccess('Análisis iniciado. Estamos procesando tu solicitud.');
    } catch (error) {
      setUiError(error instanceof Error ? error.message : 'No se pudo iniciar el análisis');
    } finally {
      setIsStartingAnalysis(false);
    }
  };

  useEffect(() => {
    if (!analysisId) {
      return;
    }

    let isActive = true;

    const poll = async () => {
      try {
        const response = await getAnalysisResult(analysisId);

        if (!isActive) {
          return;
        }

        setStatus(response.status);

        if (response.status === 'completed') {
          setResult(response.result);
          setAnalysisError(null);
          setUiSuccess('Análisis completado. Revisa los resultados.');
          return;
        }

        if (response.status === 'failed') {
          setAnalysisError(response.error);
          setResult(null);
          setUiError(response.error?.message ?? 'El análisis falló');
        }
      } catch (error) {
        if (!isActive) {
          return;
        }

        setUiError(error instanceof Error ? error.message : 'No se pudo consultar el estado del análisis');
      }
    };

    void poll();
    const intervalId = window.setInterval(() => {
      void poll();
    }, POLL_INTERVAL_MS);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [analysisId]);

  return {
    cvFile,
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
  };
};