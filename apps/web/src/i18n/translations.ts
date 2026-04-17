export type Language = 'es' | 'en';

export interface Translations {
  languageName: string;
  header: {
    brand: string;
    title: string;
    subtitle: string;
  };
  languageSwitcher: {
    label: string;
    es: string;
    en: string;
  };
  upload: {
    step: string;
    title: string;
    subtitle: string;
    fileLabel: string;
    formatHint: string;
    uploadButton: string;
    uploadingButton: string;
    readyTitle: string;
    fileName: string;
    cvId: string;
    fallbackFileName: string;
  };
  job: {
    step: string;
    title: string;
    subtitle: string;
    label: string;
    placeholder: string;
    charCount: string;
    submitButton: string;
    submittingButton: string;
  };
  status: {
    title: string;
    subtitle: string;
    analysisId: string;
    waiting: string;
    pendingLabel: string;
    pendingText: string;
    processingLabel: string;
    processingText: string;
    completedLabel: string;
    completedText: string;
    failedLabel: string;
    failedText: string;
  };
  results: {
    step: string;
    title: string;
    subtitle: string;
    overallScore: string;
    scoringVersion: string;
    scoringNote: string;
    matchedSkills: string;
    missingSkills: string;
    partialSkills: string;
    strengths: string;
    weaknesses: string;
    recommendations: string;
    noData: string;
  };
  error: {
    title: string;
  };
  completion: {
    title: string;
    subtitle: string;
    anotherJob: string;
    anotherCv: string;
  };
  uiMessages: {
    noFileSelected: string;
    uploadFailed: string;
    startWithoutCv: string;
    startFailed: string;
    pollFailed: string;
    analysisFailedFallback: string;
    resetAnotherJob: string;
    resetAnotherCv: string;
    uploadSuccess: string;
    analysisStarted: string;
    analysisCompleted: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    languageName: 'Español',
    header: {
      brand: 'HireRank',
      title: 'AI Resume Match Analyzer',
      subtitle: 'Sube tu CV en PDF, analiza compatibilidad con una vacante y revisa resultados estructurados en tiempo real.'
    },
    languageSwitcher: {
      label: 'Idioma',
      es: 'Español',
      en: 'English'
    },
    upload: {
      step: 'Paso 1',
      title: 'Subir CV',
      subtitle: 'Selecciona un PDF con texto seleccionable para iniciar el análisis.',
      fileLabel: 'Archivo PDF',
      formatHint: 'Formato soportado: PDF',
      uploadButton: 'Subir CV',
      uploadingButton: 'Subiendo…',
      readyTitle: 'CV listo para analizar',
      fileName: 'Archivo',
      cvId: 'cvId',
      fallbackFileName: 'PDF cargado'
    },
    job: {
      step: 'Paso 2',
      title: 'Descripción del Puesto',
      subtitle: 'Pega la descripción del puesto para evaluar el fit del CV.',
      label: 'Descripción del puesto',
      placeholder: 'Responsabilidades, seniority, stack técnico y skills requeridas...',
      charCount: 'caracteres',
      submitButton: 'Iniciar análisis',
      submittingButton: 'Iniciando análisis…'
    },
    status: {
      title: 'Estado del Análisis',
      subtitle: 'Seguimiento en tiempo real del procesamiento.',
      analysisId: 'analysisId',
      waiting: 'Esperando respuesta del análisis...',
      pendingLabel: 'pendiente',
      pendingText: 'En cola. El análisis será tomado por el worker en breve.',
      processingLabel: 'procesando',
      processingText: 'Procesando CV y descripción del puesto.',
      completedLabel: 'completado',
      completedText: 'Análisis completado correctamente.',
      failedLabel: 'fallido',
      failedText: 'El análisis finalizó con error.'
    },
    results: {
      step: 'Paso 4',
      title: 'Resultados del Análisis',
      subtitle: 'Resumen de compatibilidad entre CV y vacante.',
      overallScore: 'Puntaje General',
      scoringVersion: 'Versión de Scoring',
      scoringNote: 'Este resultado se genera en base al matching actual del MVP y puede evolucionar en próximas iteraciones.',
      matchedSkills: 'Skills Matcheadas',
      missingSkills: 'Skills Faltantes',
      partialSkills: 'Skills Parciales',
      strengths: 'Fortalezas',
      weaknesses: 'Debilidades',
      recommendations: 'Recomendaciones',
      noData: 'Sin datos'
    },
    error: {
      title: 'Error del Análisis'
    },
    completion: {
      title: '¿Qué deseas hacer ahora?',
      subtitle: 'Continúa con otra vacante o reinicia el flujo con un nuevo CV.',
      anotherJob: 'Analizar otra vacante',
      anotherCv: 'Subir otro CV'
    },
    uiMessages: {
      noFileSelected: 'Selecciona un archivo PDF antes de subirlo.',
      uploadFailed: 'No se pudo subir el CV',
      startWithoutCv: 'Primero sube un CV válido.',
      startFailed: 'No se pudo iniciar el análisis',
      pollFailed: 'No se pudo consultar el estado del análisis',
      analysisFailedFallback: 'El análisis falló',
      resetAnotherJob: 'Puedes analizar otra vacante con el mismo CV.',
      resetAnotherCv: 'Listo para subir un nuevo CV.',
      uploadSuccess: 'CV subido correctamente. Ya puedes iniciar el análisis.',
      analysisStarted: 'Análisis iniciado. Estamos procesando tu solicitud.',
      analysisCompleted: 'Análisis completado. Revisa los resultados.'
    }
  },
  en: {
    languageName: 'English',
    header: {
      brand: 'HireRank',
      title: 'AI Resume Match Analyzer',
      subtitle: 'Upload your PDF resume, analyze compatibility with a job opening, and review structured results in real time.'
    },
    languageSwitcher: {
      label: 'Language',
      es: 'Español',
      en: 'English'
    },
    upload: {
      step: 'Step 1',
      title: 'Upload CV',
      subtitle: 'Select a PDF with selectable text to start the analysis.',
      fileLabel: 'PDF File',
      formatHint: 'Supported format: PDF',
      uploadButton: 'Upload CV',
      uploadingButton: 'Uploading…',
      readyTitle: 'CV ready for analysis',
      fileName: 'File',
      cvId: 'cvId',
      fallbackFileName: 'Uploaded PDF'
    },
    job: {
      step: 'Step 2',
      title: 'Job Description',
      subtitle: 'Paste the job description to evaluate CV fit.',
      label: 'Job description',
      placeholder: 'Responsibilities, seniority, tech stack, and required skills...',
      charCount: 'characters',
      submitButton: 'Start analysis',
      submittingButton: 'Starting analysis…'
    },
    status: {
      title: 'Analysis Status',
      subtitle: 'Real-time processing updates.',
      analysisId: 'analysisId',
      waiting: 'Waiting for analysis response...',
      pendingLabel: 'pending',
      pendingText: 'Queued. The worker will pick up this analysis shortly.',
      processingLabel: 'processing',
      processingText: 'Processing CV and job description.',
      completedLabel: 'completed',
      completedText: 'Analysis completed successfully.',
      failedLabel: 'failed',
      failedText: 'Analysis finished with an error.'
    },
    results: {
      step: 'Step 4',
      title: 'Analysis Results',
      subtitle: 'Compatibility summary between CV and job opening.',
      overallScore: 'Overall Score',
      scoringVersion: 'Scoring Version',
      scoringNote: 'This result is generated from the current MVP matching and may evolve in future iterations.',
      matchedSkills: 'Matched Skills',
      missingSkills: 'Missing Skills',
      partialSkills: 'Partial Skills',
      strengths: 'Strengths',
      weaknesses: 'Weaknesses',
      recommendations: 'Recommendations',
      noData: 'No data'
    },
    error: {
      title: 'Analysis Error'
    },
    completion: {
      title: 'What would you like to do next?',
      subtitle: 'Continue with another job posting or restart with a new CV.',
      anotherJob: 'Analyze another job',
      anotherCv: 'Upload another CV'
    },
    uiMessages: {
      noFileSelected: 'Select a PDF file before uploading.',
      uploadFailed: 'Could not upload CV',
      startWithoutCv: 'Upload a valid CV first.',
      startFailed: 'Could not start analysis',
      pollFailed: 'Could not fetch analysis status',
      analysisFailedFallback: 'Analysis failed',
      resetAnotherJob: 'You can analyze another job with the same CV.',
      resetAnotherCv: 'Ready to upload a new CV.',
      uploadSuccess: 'CV uploaded successfully. You can now start the analysis.',
      analysisStarted: 'Analysis started. We are processing your request.',
      analysisCompleted: 'Analysis completed. Review your results.'
    }
  }
};