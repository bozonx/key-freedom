import Main from './Main'
import {BindingAction} from './interfaces/BindingAction'
import {actionsFunctions} from './helpers/actionsFunctions'


export default class RunAction {
  private readonly main: Main


  constructor(main: Main) {
    this.main = main
  }

  async destroy() {
  }


  run(actions: BindingAction[]) {
    this.runSync(actions)
      .catch(this.main.log.error)
  }


  private async runSync(actions: BindingAction[]) {
    for (let item of actions) {
      await actionsFunctions[item.action](this.main.props, item)
    }
  }

}
