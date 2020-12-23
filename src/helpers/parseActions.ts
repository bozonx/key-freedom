import {ConfigAction, ConfigCombinationAction, ConfigDeShortcutAction} from '../interfaces/AppConfig'
import {BindingAction, CmdAction, CombinationAction, DeShortcutAction} from '../interfaces/BindingAction'
import {COMBINATIONS_DELIMITER} from '../constants'
import {prepareCombination} from './parseBindings'


export const actionParsers = {
  cmd: (definition: CmdAction): CmdAction => {
    return definition
  },
  combination: (definition: ConfigCombinationAction): CombinationAction => {
    const combinations: string[] = definition.combination.split(COMBINATIONS_DELIMITER)
      .map((item) => item.trim())

    return {
      action: definition.action,
      combination: combinations.map((item) => prepareCombination(item))
    }
  },
  deShortcut: (definition: ConfigDeShortcutAction): DeShortcutAction => {
    const [ component, ...rest ] = definition.shortcut.split(':')

    return {
      action: definition.action,
      component: component.trim(),
      shortcutName: rest.join(':').trim(),
    }
  },
}

export function parseActions(rawActions: ConfigAction[]): BindingAction[] {
  return rawActions.map((item) => actionParsers[item.action](item as any))
}
