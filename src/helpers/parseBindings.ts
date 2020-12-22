import {AppConfig} from '../interfaces/AppConfig'
import {Binding} from '../interfaces/Binding'
import {COMBINATION_SEPARATOR, KEY_POSTFIX, MIRROR_KEYS} from '../constants'
import {lastItem, withoutLastItem} from './arrays'


// export function prepareMods(mod?: string[]): string[] | undefined {
//   // TODO: add - Prefix "_A" added if need
//   return mod
// }

export function parseCombination(combination?: string): string[][] | undefined {
  // TODO: add somedate
  return
}

export function parseKeyStrDefinition (strDefinition: string): {key: string, mod: string[]} {
  const keys: string[] = strDefinition.split(COMBINATION_SEPARATOR).map((item): string => {
    const trimmed = item.trim()

    if (MIRROR_KEYS.includes(trimmed)) return `${trimmed}${KEY_POSTFIX.any}`

    return trimmed
  })

  return {key: lastItem(keys), mod: withoutLastItem(keys)}
}

export function parseBindings(config: AppConfig): Binding[] {
  const result: Binding[] = []

  for (const item of config.bindings) {
    const {key, mod} = parseKeyStrDefinition(item.key)

    result.push({
      key,
      mod,
      release: item.release || false,
      cmd: item.cmd,
      combination: parseCombination(item.combination)
    })
  }

  return result
}
