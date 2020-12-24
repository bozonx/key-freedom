import {CmdAction} from './BindingAction'

export type ConfigDe = 'kdePlasmaX'
export type ConfigKeyboardListener = 'xinput'
export type ConfigKeyMap = 'xinput'


export interface ConfigCombinationAction {
  action: 'combination'
  clearCaps: boolean
  // run some other combination. Like 'Shift + Minus'
  // to run sequence add other one action
  combination: string
}

export interface ConfigDeShortcutAction {
  action: 'deShortcut'
  // like 'kwin: Walk Through Windows'
  shortcut: string
}

export type ConfigAction = (CmdAction | ConfigCombinationAction | ConfigDeShortcutAction)

export interface ConfigBinding {
  // main key
  key: string
  // act on release
  release?: boolean
  actions: ConfigAction[]
  // short actions definitions
  cmd?: string
  combination?: string
  deShortcut?: string
}

export interface ConfigProps {
  de: ConfigDe
  listener: ConfigKeyboardListener
  keyMap: ConfigKeyMap
  oneShotTimeoutMs: number
  combinationTimeoutMs: number
  execTimeoutMs: number
  runCmdTpl: string
  runCombinationTpl: string
  runDeShortCutTpl: string
}

export interface ConfigPreparedTemplates {
  combinationTplLodash: (env: Record<string, any>) => string
  deShortCutTplLodash: (env: Record<string, any>) => string
}

export type AppProps = ConfigProps & ConfigPreparedTemplates

export interface AppConfig extends Partial<ConfigProps> {
  bindings: ConfigBinding[]
}
