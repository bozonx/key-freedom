import {ConfigProps} from './interfaces/AppConfig'


export const defaultConfig: Partial<ConfigProps> = {
  oneShotTimeoutMs: 300,
  combinationTimeoutMs: 20000,
  execTimeoutMs: 20000,
  runCmdTpl: '${CMD}',
}
