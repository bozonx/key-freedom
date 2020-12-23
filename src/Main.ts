import Combinations from './Combinations'
import ShortcutMatcher from './ShortcutMatcher'
import {AppConfig, AppProps, ConfigProps} from './interfaces/AppConfig'
import RunAction from './RunAction'
import Logger from './interfaces/Logger'
import {Binding} from './interfaces/Binding'
import {kdePlasmaX} from './deConf/kdePlasmaX'
import {XINPUT_KEYS_NAMES} from './keyMaps/xinput'
import {KeyboardListener} from './interfaces/KeyboardListener'
import {XinputKeyboardListener} from './keyboardListeners/Xinput'
import {parseBindings} from './helpers/parseBindings'
import {parseProps} from './helpers/parseProps'


export const keyMaps: Record<string, string[]> = {
  xinput: XINPUT_KEYS_NAMES,
}

export const keyBoardsListeners: Record<string, new (main: Main) => KeyboardListener> = {
  xinput: XinputKeyboardListener,
}

export const deConfigs: Record<string, Partial<ConfigProps>> = {
  kdePlasmaX,
}


export default class Main {
  readonly log: Logger
  readonly props: AppProps
  readonly bindings: Binding[]
  readonly keyboard: KeyboardListener
  readonly combinations: Combinations
  readonly shortcutMatcher: ShortcutMatcher
  readonly runAction: RunAction


  constructor(logger: Logger, config: AppConfig) {
    this.log = logger
    this.props = parseProps(config)
    this.bindings = parseBindings(this.props, config.bindings)
    this.keyboard = new keyBoardsListeners[this.props.listener](this)
    this.combinations = new Combinations(this)
    this.shortcutMatcher = new ShortcutMatcher(this)
    this.runAction = new RunAction(this)

    this.log.debug(`Parsed bindings: ${JSON.stringify(this.bindings, null, 2)}`)
  }

  async destroy() {
    await this.keyboard.destroy()
    await this.combinations.destroy()
    await this.shortcutMatcher.destroy()
    await this.runAction.destroy()
  }


  async start() {
    await this.keyboard.start()
  }

}
