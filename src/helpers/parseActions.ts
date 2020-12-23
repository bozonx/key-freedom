import {AppProps, ConfigAction, ConfigCombinationAction, ConfigDeShortcutAction} from '../interfaces/AppConfig'
import {BindingAction, CmdAction, CombinationAction, DeShortcutAction} from '../interfaces/BindingAction'
import {prepareCombination} from './parseBindings'
import {COMBINATION_SEPARATOR} from '../constants'
import {keyStrToSmartKeyCodes} from './helpers'


export const actionParsers = {
  cmd: (appProps: AppProps, definition: CmdAction): CmdAction => {
    return definition
  },
  combination: (appProps: AppProps, definition: ConfigCombinationAction): CombinationAction => {
    const keysStr: string[] = prepareCombination(definition.combination)
    const keys: (string | number)[] = keysStr
      .map((key: string) => keyStrToSmartKeyCodes(appProps.keyMap, key))

    console.log(2222, keysStr, keys)

    return {
      action: definition.action,
      combination: keys.join(COMBINATION_SEPARATOR),
      keys
    }
  },
  deShortcut: (appProps: AppProps, definition: ConfigDeShortcutAction): DeShortcutAction => {
    const [ component, ...rest ] = definition.shortcut.split(':')

    return {
      action: definition.action,
      component: component.trim(),
      shortcutName: rest.join(':').trim(),
    }
  },
}

export function parseActions(appProps: AppProps, rawActions: ConfigAction[]): BindingAction[] {
  return rawActions
    .map((item) => actionParsers[item.action](appProps, item as any))
}
