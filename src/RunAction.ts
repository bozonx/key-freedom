import {exec} from 'child_process'

import Main from './Main'
import {Action} from './interfaces/BindingAction'


export default class RunAction {
  private readonly main: Main


  constructor(main: Main) {
    this.main = main
  }

  async destroy() {
    // TODO: add
  }


  run(action: Action) {
    if (action.cmd) {
      this.runCmd(action.cmd)
    }
    // TODO: add combination
  }


  private runCmd(cmd: string) {
    console.log(111111111, cmd)
    // TODO: does it need arguments???
    const res = exec(cmd);

    // TODO: kill after timeout
    // TODO: errors write to log
  }

}
