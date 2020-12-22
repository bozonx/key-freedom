import {AppConfig, ConfigAction} from '../interfaces/AppConfig'
import {Binding} from '../interfaces/Binding'
import {COMBINATION_SEPARATOR, COMBINATIONS_DELIMITER, KEY_POSTFIX, MIRROR_KEYS} from '../constants'
import {compactUndefined, lastItem, withoutLastItem} from './arrays'


export function prepareCombination(strCombination: string): string[] {
  return strCombination.split(COMBINATION_SEPARATOR).map((item): string => {
    const trimmed = item.trim()

    if (MIRROR_KEYS.includes(trimmed)) return `${trimmed}${KEY_POSTFIX.any}`

    return trimmed
  })
}

export function parseCombinations(rawCombinations?: string): string[][] | undefined {
  if (!rawCombinations) return

  const combinations: string[] = rawCombinations.split(COMBINATIONS_DELIMITER)
    .map((item) => item.trim())

  return combinations.map((item) => prepareCombination(item))
}

export function parseKeyStrDefinition (strCombination: string): {key: string, mod: string[]} {
  const keys = prepareCombination(strCombination)

  return {key: lastItem(keys), mod: withoutLastItem(keys)}
}

export function parseActions(rawActions: ConfigAction) {

}

export function parseBindings(config: AppConfig): Binding[] {
  const result: Binding[] = []

  for (const item of config.bindings) {
    const {key, mod} = parseKeyStrDefinition(item.key)

    result.push({
      key,
      mod,
      release: item.release || false,
      actions: parseActions(compactUndefined([
        ...item.actions,
        item.cmd && { action: 'cmd', cmd: item.cmd },
        item.combination && { action: 'combination', combination: item.combination },
        item.deShortcut && { action: 'deShortcut', shortCut: item.deShortcut },
      ]))
    })
  }

  return result
}
