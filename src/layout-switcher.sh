#!/usr/bin/env node


const { spawn } = require('child_process');


const altLeftKeyCode = 64;
const altRightKeyCode = 108;
const keyPressDurationMs = 300;
const firstLayout = 'us';
const lastLayout = 'ru';


// TODO: нужно собирать аргументы скрипта

// object like {keyCode: timeoutId}
let releaseWaitTimeouts = {};


function extractKeyboardsIds(xinputResult) {
  const xinputResultLines = xinputResult.split('\n');
  const ids = [];

  for (let index in xinputResultLines) {
    const item = xinputResultLines[index];

    if (!item.match(/\[slave\s+keyboard/)) continue;

    const stripped = item.replace(/\[slave\s+keyboard/, '');

    if (!stripped.match(/XinputKeyboard/i)) continue;

    if (
      stripped.indexOf('Virtual core XTEST keyboard') >= 0
      || stripped.indexOf('XinputKeyboard System Control') >= 0
      || stripped.indexOf('XinputKeyboard Consumer Control') >= 0
    ) continue;

    ids.push(parseInt(stripped.match(/id=(\d+)/)[1]));
  }

  return ids;
}

async function getXinputResult() {
  return new Promise((resolve, reject) => {
    const proc = spawn('xinput');

    proc.stdout.on('data', (dataBuf) => {

      resolve(dataBuf.toString());
    });

    // TODO: add timeout of getting result
    // TODO: handle errors
  });
}

function addKeyboardListener(id, cb) {
  const proc = spawn('xinput', ['test', id]);

  proc.stdout.on('data', (dataBuf) => {
    const dataStr = dataBuf.toString();
    const press = Boolean(dataStr.indexOf('press') >= 0);
    const release = !press;
    const keyCode = parseInt(dataStr.match(/(\d+)\s*$/)[1]);

    cb(keyCode, press, release);
  });

  // TODO: add timeout of getting result
  // TODO: handle errors
}

function handleKeyEvent(keyCode, press, release) {
  switchLayout(keyCode, press, release);
}

function switchLayout(keyCode, press, release) {
  const toFirst = keyCode === altLeftKeyCode;
  const toLast = keyCode === altRightKeyCode;

  if (!toFirst && !toLast) return;

  // do not handle new presses while this button is pressed
  if (press && toFirst && releaseWaitTimeouts[altLeftKeyCode]) return;
  else if (press && toLast && releaseWaitTimeouts[altRightKeyCode]) return;
  else if (press) {
    // if other key has been pressed - then clear and start a new cycle
    clearTimeout(releaseWaitTimeouts[altLeftKeyCode]);
    clearTimeout(releaseWaitTimeouts[altRightKeyCode]);

    delete releaseWaitTimeouts[altLeftKeyCode];
    delete releaseWaitTimeouts[altRightKeyCode];
  }

  if (release) {
    if (
      (toFirst && releaseWaitTimeouts[altLeftKeyCode])
      ||(toLast && releaseWaitTimeouts[altRightKeyCode])
    ) {
      clearTimeout(releaseWaitTimeouts[keyCode]);

      delete releaseWaitTimeouts[keyCode];

      startXkbSwitch(toFirst, toLast);
    }

    return;
  }

  releaseWaitTimeouts[keyCode] = setTimeout(() => {
    delete releaseWaitTimeouts[keyCode];
  }, keyPressDurationMs);
}

function startXkbSwitch(toFirst, toLast) {
  let resolvedLayout = (toFirst) ? firstLayout : lastLayout;

  const proc = spawn('xkb-switch', ['-s', resolvedLayout]);

  // TODO: add timeout of getting result
  // TODO: handle errors
}


async function start() {
  const xinputResult = await getXinputResult();

  const ids = extractKeyboardsIds(xinputResult);

  for (let id of ids) {
    addKeyboardListener(id, handleKeyEvent);
  }
}

start()
  .catch(console.error);
