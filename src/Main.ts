import Keyboard from './Keyboard'
import Combinations from './Combinations'
import ShortcutFinder from './ShortcutFinder'


export default class Main {
  readonly keyboard: Keyboard
  readonly combinations: Combinations
  readonly shortcutFinder: ShortcutFinder


  constructor(config: AppConfig) {
    this.keyboard = new Keyboard(this)
    this.combinations = new Combinations(this)
    this.shortcutFinder = new ShortcutFinder(this)
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
