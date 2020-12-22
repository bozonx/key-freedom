import {ConfigProps} from './interfaces/AppConfig'


export const defaultConfig: ConfigProps = {
  listener: 'xinput',
  keyMap: 'xinput',
  oneShotTimeout: 300,
  pressTimeout: 2000,
  combinationTimeout: 20000,
  runCmdTpl: '${CMD}',
}
