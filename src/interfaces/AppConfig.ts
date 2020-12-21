export interface ConfigBinding {
  // main key
  key: string | number
  // modifiers
  mod?: string[]
  // act on release
  release?: boolean
  // run some cmd
  cmd?: string
  // run some other combination
  combination?: string
}


export interface AppConfig {
  bindings: ConfigBinding[]
}
