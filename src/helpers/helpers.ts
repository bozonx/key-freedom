import LogLevel, {LOG_LEVELS} from '../interfaces/LogLevel'
import {KEY_POSTFIX} from '../constants'
import {keyMaps} from '../Main'


/**
 * Makes ['info', 'warn', 'error'] if log level is 'info'
 */
export function calcAllowedLogLevels(logLevel: LogLevel): LogLevel[] {
  const currentLevelIndex: number = LOG_LEVELS.indexOf(logLevel);

  return LOG_LEVELS.slice(currentLevelIndex) as LogLevel[];
}

export function replacePostfix(str: string, to: string = ''): string {
  // TODO: проверить что вернет ту же строку если не совпадет
  // TODO: сделать более оптимально, либо через replace либо indexOf()
  const match = str.match(/(.+)_[LRA]$/)

  if (!match) return str

  return `${match[1]}${to}`
}

export function keyStrToSmartKeyCodes(mapName: string, keyName: string): string | number {

  console.log(33333, keyName, keyName.indexOf('_') > 0)

  if (keyName.indexOf('_') > 0) {
    if (keyName.indexOf(KEY_POSTFIX.any)) return replacePostfix(keyName)

    return keyName
  }

  return keyMaps[mapName].indexOf(keyName)
}

// export function convertToKeyCode(keyName: string): number[] {
//
//   // TODO: add - поддержка мета клавиш - Alt, Ctrl
//
//   return [SPECIAL_KEYS_NAMES.indexOf(keyName)]
// }
