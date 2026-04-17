import { logger } from '../config/logger.js';
import { analyzeCvWithAiService } from '../integrations/ai-service/ai-service.client.js';
import {
  claimAnalysisForProcessing,
  findPendingAnalyses,
  markAnalysisCompleted,
  markAnalysisFailed
} from '../modules/analyses/analyses.repository.js';

const WORKER_INTERVAL_MS = 5000;

const mapToAnalysisErrorCode = (error) => {
  if (error?.code) {
    return error.code;
  }

  return 'AI_ANALYSIS_FAILED';
};

const processAnalysis = async (analysisId) => {
  const claimedAnalysis = await claimAnalysisForProcessing(analysisId);

  if (!claimedAnalysis) {
    return;
  }

  try {
    const aiPayload = await analyzeCvWithAiService({
      cvFilePath: claimedAnalysis.storage_path,
      jobDescription: claimedAnalysis.job_description_raw
    });

    await markAnalysisCompleted({
      analysisId: claimedAnalysis.id,
      resultPayload: aiPayload
    });
  } catch (error) {
    const errorCode = mapToAnalysisErrorCode(error);

    await markAnalysisFailed({
      analysisId: claimedAnalysis.id,
      errorCode
    });

    logger.error('Worker failed while processing analysis', {
      analysisId: claimedAnalysis.id,
      code: errorCode,
      message: error.message
    });
  }
};

let isRunning = false;

const runPendingAnalyses = async () => {
  if (isRunning) {
    return;
  }

  isRunning = true;

  try {
    const pendingAnalyses = await findPendingAnalyses(10);

    for (const analysis of pendingAnalyses) {
      await processAnalysis(analysis.id);
    }
  } catch (error) {
    logger.error('Worker loop failed', { message: error.message });
  } finally {
    isRunning = false;
  }
};

export const startAnalysesWorker = () => {
  const intervalId = setInterval(() => {
    runPendingAnalyses().catch((error) => {
      logger.error('Unexpected worker runtime error', { message: error.message });
    });
  }, WORKER_INTERVAL_MS);

  runPendingAnalyses().catch((error) => {
    logger.error('Unexpected worker startup error', { message: error.message });
  });

  logger.info(`Analyses worker started (interval: ${WORKER_INTERVAL_MS}ms)`);

  return () => {
    clearInterval(intervalId);
    logger.info('Analyses worker stopped');
  };
};