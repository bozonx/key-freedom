import LogLevel, {LOG_LEVELS} from '../interfaces/LogLevel'


/**
 * Makes ['info', 'warn', 'error'] if log level is 'info'
 */
export function calcAllowedLogLevels(logLevel: LogLevel): LogLevel[] {
  const currentLevelIndex: number = LOG_LEVELS.indexOf(logLevel);

  return LOG_LEVELS.slice(currentLevelIndex) as LogLevel[];
}

export function replacePostfix(str: string, to: string): string {
  const match = str.match(/(.+)_[LRA]$/)

  if (!match) return str

  return `${match[1]}${to}`
}


//export function keyCodeToModName(keyCode: number): string {
  //const keyName: string | undefined = SPECIAL_KEYS_NAMES[keyCode]

  //return (keyName) ? keyName : String(keyCode)

//  return SPECIAL_KEYS_NAMES[keyCode]
//}

// export function convertToKeyCode(keyName: string): number[] {
//
//   // TODO: add - поддержка мета клавиш - Alt, Ctrl
//
//   return [SPECIAL_KEYS_NAMES.indexOf(keyName)]
// }
