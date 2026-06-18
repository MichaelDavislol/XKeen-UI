export interface ConfigApplyResult {
  success: boolean
  error?: string
  rollbackPerformed?: boolean
  stage?: string
}

export function formatConfigApplyError(result: Pick<ConfigApplyResult, 'error' | 'rollbackPerformed' | 'stage'>): string {
  const stage = result.stage ?? 'unknown'
  const rollbackSuffix = result.rollbackPerformed ? '. Выполнен автоматический rollback.' : ''
  return `Ошибка применения (${stage}): ${result.error ?? 'Неизвестная ошибка'}${rollbackSuffix}`
}

export function getConfigApplyStatus(result: Pick<ConfigApplyResult, 'success' | 'rollbackPerformed' | 'stage'>): 'running' | 'stopped' {
  if (result.success || result.rollbackPerformed) return 'running'
  return ['backup', 'validate', 'write'].includes(result.stage ?? '') ? 'running' : 'stopped'
}
