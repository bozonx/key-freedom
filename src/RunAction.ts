import {exec} from 'child_process'

import Main from './Main'
import {BindingAction} from './interfaces/BindingAction'


export default class RunAction {
  private readonly main: Main


  constructor(main: Main) {
    this.main = main
  }

  async destroy() {
    // TODO: add
  }


  run(actions: BindingAction[]) {
    for (let item of actions) {
      if (item.action === 'cmd') {
        this.runCmd(item.cmd)
      }
      // TODO: add combination
    }

  }


  private runCmd(cmd: string) {
    console.log(111111111, cmd)
    // TODO: does it need arguments???
    const res = exec(cmd);

    // TODO: kill after timeout
    // TODO: errors write to log
  }

}
