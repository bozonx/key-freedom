export interface ConfigBinding {
  // main key
  key: string
  // modifiers
  mod?: string[]
  // order of modifiers matters. By default it doesn't matters.
  ordered?: boolean
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
