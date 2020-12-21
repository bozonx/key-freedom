export interface Action {
  // run some cmd
  cmd?: string
  // run some other combination
  combination?: string[][]
  deShortCut?: {
    component: string
    shortCutName: string
  }
}
