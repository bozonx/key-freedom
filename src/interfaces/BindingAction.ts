// export interface Action {
//   // run some cmd
//   cmd?: string
//   // run some other combination
//   combination?: string[][]
//   deShortCut?: {
//     component: string
//     shortCutName: string
//   }
// }

export interface CmdAction {
  action: 'cmd'
  cmd: string
}

export interface CombinationAction {
  action: 'combination'
  combination: string[][]
}

export interface DeShortcutAction {
  action: 'deShortCut'
  component: string
  shortCutName: string
}

export type BindingAction = CmdAction | CombinationAction | DeShortcutAction
