import { useEffect, useMemo, useState } from 'react';

import { getAnalysisResult, startAnalysis, uploadCv } from '../services/api';
import type { AnalysisResultPayload, AnalysisStatus, ResultError } from '../types/api';

const POLL_INTERVAL_MS = 2000;

export const useAnalysisFlow = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvId, setCvId] = useState<string | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus | null>(null);
  const [result, setResult] = useState<AnalysisResultPayload | null>(null);
  const [analysisError, setAnalysisError] = useState<ResultError | null>(null);
  const [uiError, setUiError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isStartingAnalysis, setIsStartingAnalysis] = useState(false);

  const canStartAnalysis = useMemo(() => Boolean(cvId), [cvId]);

  const handleSelectCvFile = (file: File | null) => {
    setCvFile(file);
    setUiError(null);
  };

  const handleUploadCv = async () => {
    if (!cvFile) {
      setUiError('Selecciona un archivo PDF antes de subirlo.');
      return;
    }

    setIsUploading(true);
    setUiError(null);

    try {
      const response = await uploadCv(cvFile);
      setCvId(response.cvId);
      setStatus(null);
      setAnalysisId(null);
      setResult(null);
      setAnalysisError(null);
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
    setResult(null);
    setAnalysisError(null);

    try {
      const response = await startAnalysis({ cvId, jobDescription });
      setAnalysisId(response.analysisId);
      setStatus(response.status);
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
          return;
        }

        if (response.status === 'failed') {
          setAnalysisError(response.error);
          setResult(null);
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
  };
};