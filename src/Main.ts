import Keyboard from './Keyboard'
import Combinations from './Combinations'
import ShortcutFinder from './ShortcutFinder'
import {AppConfig} from './interfaces/AppConfig'
import RunAction from './RunAction'


export default class Main {
  readonly config: AppConfig
  readonly keyboard: Keyboard
  readonly combinations: Combinations
  readonly shortcutFinder: ShortcutFinder
  readonly runAction: RunAction


  constructor(config: AppConfig) {
    this.config = config
    this.keyboard = new Keyboard(this)
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
