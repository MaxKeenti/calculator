import { equals } from './basicOperations.js';
import { cleanDisplay } from './ui.js';

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