import {AppProps, ConfigBinding} from '../interfaces/AppConfig'
import {Binding} from '../interfaces/Binding'
import {COMBINATION_SEPARATOR, KEY_POSTFIX, MIRROR_KEYS} from '../constants'
import {compactUndefined, lastItem, uniqueArray, withoutLastItem} from './arrays'
import {parseActions} from './parseActions'


export function prepareCombination(strCombination: string): string[] {
  const result = strCombination.split(COMBINATION_SEPARATOR).map((item): string => {
    const trimmed = item.trim()
    // if it is Ctrl or Alt or Super them add _A postfix,
    // means this will be matched on pressing of any side
    if (MIRROR_KEYS.includes(trimmed)) return `${trimmed}${KEY_POSTFIX.any}`

    return trimmed
  })

  return uniqueArray(result)
}

export function parseKeyStrDefinition (strCombination: string): {key: string, mod: string[]} {
  const keys = prepareCombination(strCombination)

  return {key: lastItem(keys), mod: withoutLastItem(keys)}
}

export function parseBindings(props: AppProps, configBinding: ConfigBinding[] = []): Binding[] {
  return configBinding.map((item) => {
    const {key, mod} = parseKeyStrDefinition(item.key)

    return {
      key,
      mod,
      release: item.release || false,
      actions: parseActions(props, compactUndefined([
        ...item.actions || [],
        item.cmd && { action: 'cmd', cmd: item.cmd },
        item.combination && { action: 'combination', combination: item.combination },
        item.deShortcut && { action: 'deShortcut', shortcut: item.deShortcut },
      ]))
    }
  })
}
