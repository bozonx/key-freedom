import {ConfigAction, ConfigCombinationAction, ConfigDeShortcutAction} from '../interfaces/AppConfig'
import {BindingAction, CmdAction, CombinationAction, DeShortcutAction} from '../interfaces/BindingAction'
import {prepareCombination} from './parseBindings'
import {COMBINATION_SEPARATOR} from '../constants'


export const actionParsers = {
  cmd: (definition: CmdAction): CmdAction => {
    return definition
  },
  combination: (definition: ConfigCombinationAction): CombinationAction => {
    const keys: string[] = prepareCombination(definition.combination)

    // TODO: конвертнуть в коды

    return {
      action: definition.action,
      combination: keys.join(COMBINATION_SEPARATOR),
      keys
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
