import {Action} from './Action'


export interface Binding extends Action {
  // main key names. More than one for left and right Ctrl etc
  key: string[]
  // prepared modifiers. Prefix "_A" added if need
  mod?: string[]
  // act only on release
  release: boolean
}
