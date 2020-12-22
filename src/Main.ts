import Combinations from './Combinations'
import ShortcutFinder from './ShortcutFinder'
import {AppConfig, ConfigProps} from './interfaces/AppConfig'
import RunAction from './RunAction'
import Logger from './interfaces/Logger'
import {Binding} from './interfaces/Binding'
import {defaultConfig} from './defaultConfig'
import {omitObj} from './helpers/objects'
import {kdePlasmaX} from './deConf/kdePlasmaX'
import {prepareBindings} from './helpers/shurtcutMatchHelpers'
import {XINPUT_KEYS_NAMES} from './keyMaps/xinput'
import {KeyboardListener} from './interfaces/KeyboardListener'
import {XinputKeyboardListener} from './keyboardListeners/Xinput'


export const keyMaps: Record<string, string[]> = {
  xinput: XINPUT_KEYS_NAMES,
}

export const keyBoardsListeners: Record<string, new (main: Main) => KeyboardListener> = {
  xinput: XinputKeyboardListener,
}

const deConfigs: Record<string, ConfigProps> = {
  kdePlasmaX,
}


export default class Main {
  readonly log: Logger
  readonly props: ConfigProps
  readonly bindings: Binding[]
  readonly keyboard: KeyboardListener
  readonly combinations: Combinations
  readonly shortcutFinder: ShortcutFinder
  readonly runAction: RunAction


  constructor(logger: Logger, config: AppConfig) {
    this.log = logger
    this.props = this.prepareProps(config)
    this.bindings = prepareBindings(config)
    this.keyboard = new keyBoardsListeners[this.props.listener](this)
    this.combinations = new Combinations(this)
    this.shortcutFinder = new ShortcutFinder(this)
    this.runAction = new RunAction(this)
  }

  async destroy() {
    await this.keyboard.destroy()
    await this.combinations.destroy()
    await this.shortcutFinder.destroy()
    await this.runAction.destroy()
  }


  async start() {
    await this.keyboard.start()
  }


  private prepareProps(config: AppConfig): ConfigProps {
    return {
      ...defaultConfig,
      ...deConfigs[config.de],
      ...omitObj(config, 'bindings'),
    }
  }

}
