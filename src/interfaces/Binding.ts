import {Action} from './Action'


export interface Binding extends Action {
  // main key names. More than one for left and right Ctrl etc
  // Prefix "_A" added for OR statement to Ctrl, Alt and Super
  key: string
  // prepared modifiers. Prefix "_A" added for OR statement to Ctrl, Alt and Super
  mod?: string[]
  // act only on release
  release: boolean
}
