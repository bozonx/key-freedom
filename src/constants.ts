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


// see https://gist.github.com/rickyzhang82/8581a762c9f9fc6ddb8390872552c250
// in column sdl
export const SPECIAL_KEYS_NAMES: string[] = [
  '-0',
  '-1',
  '-2',
  '-3',
  '-4',
  '-5',
  '-6',
  '-7',
  '-8',
  'Escape', // 9
  '-10',
  '-11',
  '-12',
  '-13',
  '-14',
  '-15',
  '-16',
  '-17',
  '-18',
  '-19',
  'Minus', // 20
  'Equal', // 21
  'BackSpace', // 22
  'Tab', // 23
  '-24',
  '-25',
  '-26',
  '-27',
  '-28',
  '-29',
  '-30',
  '-31',
  '-32',
  '-33',
  '-34',
  '-35',
  'Enter', // 36 (or Return???)
  'Ctrl_L', // 37
  'a', // 38
  's', // 39
  'd', // 40
  'f', // 41
  '-42',
  '-43',
  'j', // 44
  'k', // 45
  'l', // 46
  'Semicolon', // 47
  'Apostrophe', // 48
  'Tilda', // 49
  'Shift_L', // 50
  'BackSlash', // 51
  '-52',
  '-53',
  '-54',
  '-55',
  '-56',
  '-57',
  '-58',
  '-59',
  '-60',
  '-61',
  'Shift_R', // 62
  '-63',
  'Alt_L', // 64
  'Space', // 65
  'CapsLock', // 66
  '-67',
  '-68',
  '-69',
  '-70',
  '-71',
  '-72',
  '-73',
  '-74',
  '-75',
  '-76',
  '-77',
  '-78',
  'KpHome', // 79
  'KpUp', // 80
  'KpPgUp', // 81
  '-82',
  'KpLeft', // 83
  '-84',
  'KpRight', // 85
  '-86',
  'KpEnd', // 87
  'KpDown', // 88
  'KpPgDown', // 89
  '-90',
  '-91',
  '-92',
  '-93',
  '-94',
  '-95',
  '-96',
  '-97',
  '-98',
  '-99',
  '-100',
  '-101',
  '-102',
  '-103',
  '-104',
  'Ctrl_R', // 105
  '-106',
  '-107',
  'Alt_R', // 108
  '-109',
  'Home', // 110
  'Up', // 111
  'PgUp', // 112
  'Left', // 113
  'Right', // 114
  'End', // 115
  'Down', // 116
  'PgDown', // 117
  'Insert', // 118
  'Delete', // 119
  '-120',
  '-121',
  '-122',
  '-123',
  '-124',
  '-125',
  '-126',
  '-127',
  '-128',
  '-129',
  '-130',
  '-131',
  '-132',
  'Super_L', // 133

  // TODO: add Super_R
  // TODO: add key pad
  // TODO: add F keys
  // TODO: add ciphers
  // TODO: add eng characters
]
