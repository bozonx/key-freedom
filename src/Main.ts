import XinputKeyboard from './XinputKeyboard'
import Combinations from './Combinations'
import ShortcutFinder from './ShortcutFinder'
import {AppConfig, ConfigProps} from './interfaces/AppConfig'
import RunAction from './RunAction'
import Logger from './interfaces/Logger'
import {Binding} from './interfaces/Binding'


export default class Main {
  readonly log: Logger
  readonly props: ConfigProps
  readonly bindings: Binding[]
  readonly keyboard: XinputKeyboard
  readonly combinations: Combinations
  readonly shortcutFinder: ShortcutFinder
  readonly runAction: RunAction


  constructor(logger: Logger, config: AppConfig) {
    this.log = logger
    this.config = config
    this.keyboard = new XinputKeyboard(this)
    this.combinations = new Combinations(this)
    this.shortcutFinder = new ShortcutFinder(this)
    this.runAction = new RunAction(this)
  }

  async destroy() {
    await this.keyboard.destroy()
    await this.combinations.destroy()
    await this.shortcutFinder.destroy()
  }


  async start() {
    await this.keyboard.start()
  }

}
