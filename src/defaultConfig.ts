import {ConfigProps} from './interfaces/AppConfig'


export const defaultConfig: Partial<ConfigProps> = {
  oneShotTimeoutMs: 300,
  pressTimeoutMs: 2000,
  combinationTimeoutMs: 20000,
  runCmdTpl: '${CMD}',
}
