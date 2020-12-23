export const COMBINATION_SEPARATOR = '+'
export const MIRROR_KEYS = [
  'Ctrl',
  'Alt',
  'Super'
]

// export const NON_CONVERTABLE_KEYS = [
//   'Ctrl',
//   'Ctrl_L',
//   'Ctrl_R',
//   'Alt',
//   'Alt_L',
//   'Alt_L',
//   'Super',
//   'Super_L',
//   'Super_R',
// ]


export enum KEY_EVENT {
  press,
  release,
}

export const KEY_POSTFIX = {
  left: '_L',
  right: '_R',
  // means left or right button
  any: '_A',
}
