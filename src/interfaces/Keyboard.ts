export type KeyboardHandler = (keyCode: number, press: boolean, release: boolean) => void


export interface Keyboard {
  destroy(): Promise<void>
  start(): Promise<void>
  addListener(cb: KeyboardHandler): number
  removeListener(handlerIndex: number): void
}
