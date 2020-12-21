import {Action} from './Action'


export interface ShortcutBinding extends Action {
  // main key codes. More than one for left and right Ctrl etc
  key: number[]
  // prepared modifiers. Prefix "_A" added if need
  mod?: string[]
  // act only on release
  release?: boolean
}
