import Combinations from './Combinations'
import ShortcutMatcher from './ShortcutMatcher'
import {AppConfig, ConfigProps} from './interfaces/AppConfig'
import RunAction from './RunAction'
import Logger from './interfaces/Logger'
import {Binding} from './interfaces/Binding'
import {defaultConfig} from './defaultConfig'
import {omitObj} from './helpers/objects'
import {kdePlasmaX} from './deConf/kdePlasmaX'
import {XINPUT_KEYS_NAMES} from './keyMaps/xinput'
import {KeyboardListener} from './interfaces/KeyboardListener'
import {XinputKeyboardListener} from './keyboardListeners/Xinput'
import {parseBindings} from './helpers/parseBindings'


export const keyMaps: Record<string, string[]> = {
  xinput: XINPUT_KEYS_NAMES,
}

export const keyBoardsListeners: Record<string, new (main: Main) => KeyboardListener> = {
  xinput: XinputKeyboardListener,
}

const deConfigs: Record<string, Partial<ConfigProps>> = {
  kdePlasmaX,
}


export default class Main {
  readonly log: Logger
  readonly props: ConfigProps
  readonly bindings: Binding[]
  readonly keyboard: KeyboardListener
  readonly combinations: Combinations
  readonly shortcutMatcher: ShortcutMatcher
  readonly runAction: RunAction


  constructor(logger: Logger, config: AppConfig) {
    this.log = logger
    this.props = this.prepareProps(config)
    this.bindings = parseBindings(config)
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


  private prepareProps(config: AppConfig): ConfigProps {
    if (!config.de) throw new Error(`Please specify the "de"param in config`)

    return {
      ...defaultConfig,
      ...deConfigs[config.de],
      ...omitObj(config, 'bindings'),
    } as ConfigProps
  }

}
