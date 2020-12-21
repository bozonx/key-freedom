import LogLevel, {LOG_LEVELS} from '../interfaces/LogLevel'
import {SPECIAL_KEYS_NAMES} from '../constants'


/**
 * Makes ['info', 'warn', 'error'] if log level is 'info'
 */
export function calcAllowedLogLevels(logLevel: LogLevel): LogLevel[] {
  const currentLevelIndex: number = LOG_LEVELS.indexOf(logLevel);

  return LOG_LEVELS.slice(currentLevelIndex) as LogLevel[];
}

export function replacePostfix(str: string, to: string): string {
  // TODO: add
  return ''
}

export function convertToKeyCode(key: string): number[] {
// TODO: add
  return []
}

export function prepareMods(mod?: string[]): string[] | undefined {
// TODO: add
  return
}

export function parseCombination(combination?: string): string[][] | undefined {
  // TODO: add
  return
}

export function keyCodeToModName(keyCode: number): string {
  const keyName: string | undefined = SPECIAL_KEYS_NAMES[keyCode]

  return (keyName) ? keyName : String(keyCode)
}
