import {KEY_POSTFIX} from '../constants'
import {AppConfig} from '../interfaces/AppConfig'
import {Binding} from '../interfaces/Binding'
import {convertToKeyCode, parseCombination, prepareMods, replacePostfix} from './helpers'
import {CombinationEvent} from '../Combinations'


export function isCombinationMatches(
  key: number,
  pressedMods: string[],
  event: CombinationEvent,
  binding: Binding
): boolean {
  if (binding.release && event != CombinationEvent.release) {
    return false
  }
  else if (!binding.release && event == CombinationEvent.release) {
    return false
  }
  else if (!binding.key.includes(key)) {
    return false
  }
  else if (!isModsSame(pressedMods, binding.mod)) {
    return false
  }

  return true
}

export function isModsSame(pressedMods: string[], bindingMods?: string[]): boolean {
  if (!bindingMods || !bindingMods.length) {
    // if no pressedMods then means one shot
    // else if pressed some mods then means mods aren't same
    return !pressedMods.length
  }
  else if (pressedMods.length !== bindingMods.length) {
    // if lengths of pressed keys and expected keys aren't same
    return false;
  }

  let foundCount = 0

  for (const pressedMod of pressedMods) {
    if (bindingMods.includes(pressedMod)) {
      // means it has the same key
      foundCount++

      continue
    }
    else {
      // try to find key with postfix _A
      if (bindingMods.includes(replacePostfix(pressedMod, KEY_POSTFIX.any))) {
        foundCount++

        continue
      }

      return false
    }
  }

  return foundCount === bindingMods.length
}

export function prepareBindings(config: AppConfig): Binding[] {
  const result: Binding[] = []

  for (const item of config.bindings) {
    result.push({
      key: convertToKeyCode(item.key),
      mod: prepareMods(item.mod),
      release: item.release || false,
      cmd: item.cmd,
      combination: parseCombination(item.combination)
    })
  }

  return result
}
