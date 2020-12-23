export type ActionName = 'cmd'
  | 'combination'
  | 'deShortcut'

export interface CmdAction {
  action: 'cmd'
  cmd: string
}

export interface CombinationAction {
  action: 'combination'
  combination: string[][]
}

export interface DeShortcutAction {
  action: 'deShortcut'
  component: string
  shortcutName: string
}

export type BindingAction = CmdAction | CombinationAction | DeShortcutAction
