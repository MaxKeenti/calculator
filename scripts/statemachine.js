import { equals } from './basicOperations.js';
import { cleanDisplay } from './ui.js';

const STATE_ZERO = 1;
const STATE_CAPTURE_A = 2;
const STATE_CAPTURE_OPERATION = 3;
const STATE_CAPTURE_B = 4;
const STATE_EQUALS = 5;

const ACTION_NUMBER = 1;
const ACTION_OPERATION = 2;
const ACTION_RESULT = 3;

const handlers = {
  [STATE_ZERO]: {
    [ACTION_NUMBER]: () => { state = STATE_CAPTURE_A; },
  },
  [STATE_CAPTURE_A]: {
    [ACTION_NUMBER]: () => { state = STATE_CAPTURE_A; },
    [ACTION_OPERATION]: (parameter) => {
      state = STATE_CAPTURE_OPERATION;
      operation = parameter;
      a = parseInt(document.getElementById("display").value);
      cleanDisplay();
    },
  },
  [STATE_CAPTURE_OPERATION]: {
    [ACTION_NUMBER]: () => {
      console.log("Capturando segundo número");
      state = STATE_CAPTURE_B;
    },
  },
  [STATE_CAPTURE_B]: {
    [ACTION_OPERATION]: () => {
      b = parseInt(document.getElementById("display").value);
      state = STATE_EQUALS;
      equals();
    },
    [ACTION_RESULT]: () => {
      b = parseInt(document.getElementById("display").value);
      state = STATE_EQUALS;
      equals();
    },
  },
};

function stateMachine(action, parameter) {
  const handler = handlers[state]?.[action];
  if (handler) handler(parameter);
  else console.warn(`No handler for state=${state}, action=${action}`);
}

export { stateMachine };