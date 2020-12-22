import {ConfigProps} from './interfaces/AppConfig'


export const defaultConfig: Partial<ConfigProps> = {
  oneShotTimeout: 300,
  pressTimeout: 2000,
  combinationTimeout: 20000,
  runCmdTpl: '${CMD}',
}
