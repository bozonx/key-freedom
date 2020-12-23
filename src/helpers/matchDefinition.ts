import {KEY_EVENT, KEY_POSTFIX, MIRROR_KEYS} from '../constants'
import {Binding} from '../interfaces/Binding'
import {replacePostfix} from './helpers'


export function isCombinationMatches(
  key: string,
  pressedMods: string[],
  event: KEY_EVENT,
  binding: Binding
): boolean {
  if (binding.release && event != KEY_EVENT.release) {
    return false
  }
  else if (!binding.release && event == KEY_EVENT.release) {
    return false
  }

  else if (!isKeySame(binding.key, key)) {
    return false
  }
  else if (!isModsSame(binding.mod, pressedMods)) {
    return false
  }

  return true
}

export function isKeySame(expectedKey: string, testKey: string): boolean {
  if (expectedKey === testKey) return true

  return expectedKey.indexOf(KEY_POSTFIX.any) > 0
    //&& testKey.indexOf('_') > 0
    && expectedKey === replacePostfix(testKey, KEY_POSTFIX.any)
}

/**
 * There is no need to remove duplicates
 */
export function isModsSame(expectedMods: string[], pressedMods: string[]): boolean {
  if (!expectedMods.length) {
    // if no pressedMods means one shot
    // else if pressed some mods then means mods aren't same
    return !pressedMods.length
  }
  else if (expectedMods.length !== pressedMods.length) {
    // if lengths of pressed keys and expected keys aren't same
    return false
  }

  let foundCount = 0

  for (const pressedMod of pressedMods) {
    if (expectedMods.includes(pressedMod)) {
      // means it has the same key
      foundCount++

      continue
    }
    else {
      // try to find key with postfix _A
      if (expectedMods.includes(replacePostfix(pressedMod, KEY_POSTFIX.any))) {
        foundCount++

        continue
      }
      // if we haven't found at least one mod it means that combination doesn't match
      return false
    }
  }

  return foundCount === expectedMods.length
}
