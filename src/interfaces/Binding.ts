import {BindingAction} from './BindingAction'


export interface Binding {
  // main key names. More than one for left and right Ctrl etc
  // Prefix "_A" added for OR statement to Ctrl, Alt and Super
  key: string
  // prepared modifiers. Prefix "_A" added for OR statement to Ctrl, Alt and Super
  mod?: string[]
  // act only on release
  release: boolean
  actions: BindingAction[]
}
