export type ActionName = 'cmd'
  | 'combination'
  | 'deShortcut'

export interface CmdAction {
  action: 'cmd'
  cmd: string
}

export interface CombinationAction {
  action: 'combination'
  clearCaps: boolean
  combination: string
  keys: (string | number)[]
}

export interface DeShortcutAction {
  action: 'deShortcut'
  component: string
  shortcutName: string
}

export type BindingAction = CmdAction | CombinationAction | DeShortcutAction
