export type ConfigDe = 'kdePlasmaX'
export type ConfigKeyboardListener = 'xinput'
export type ConfigKeyMap = 'xinput'


export interface ConfigAction {
  // run some cmd
  cmd?: string
  // run some other combination. Like 'Shift + Minus, Shift + Equal'
  combination?: string
  // like 'kwin: Walk Through Windows'
  deShortCut?: string
}

export interface ConfigBinding extends ConfigAction {
  // main key
  key: string
  // act on release
  release?: boolean
  actions: ConfigAction[]
}

export interface ConfigProps {
  de: ConfigDe
  listener: ConfigKeyboardListener
  keyMap: ConfigKeyMap
  oneShotTimeoutMs: number
  pressTimeoutMs: number
  combinationTimeoutMs: number
  runCmdTpl: string
  runCombinationTpl: string
  runDeShortCutTpl: string
}

export interface AppConfig extends Partial<ConfigProps> {
  bindings: ConfigBinding[]
}
