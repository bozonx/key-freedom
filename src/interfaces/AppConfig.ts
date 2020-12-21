export type ConfigDe = 'kdePlasmaX'

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
  oneShotTimeout?: number
  pressTimeout?: number
  combinationTimeout?: number
  runCmdTpl?: string
  runCombinationTpl?: string
  runDeShortCutTpl?: string
}

export interface AppConfig extends ConfigProps {
  de: ConfigDe
  bindings: ConfigBinding[]
}
