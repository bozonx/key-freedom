import Keyboard from './Keyboard';
import Combinations from './Combinations';


export default class Main {
  readonly keyboard: Keyboard
  readonly combinations: Combinations


  constructor() {
    this.keyboard = new Keyboard(this)
    this.combinations = new Combinations(this)
  }


}
