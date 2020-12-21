import {spawn} from 'child_process'

import Main from './Main'
import {Action} from './interfaces/Action'


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
    // TODO: does it need arguments???
    const proc = spawn(cmd);

    // TODO: kill after timeout
    // TODO: errors write to log
  }

}
