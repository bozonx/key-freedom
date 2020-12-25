import {ConfigProps} from './interfaces/AppConfig'


export const defaultConfig: Partial<ConfigProps> = {
  oneShotTimeoutMs: 400,
  combinationTimeoutMs: 30000,
  execTimeoutMs: 20000,
  runCmdTpl: '${CMD}',
}
