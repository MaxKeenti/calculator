import { equals } from "./basicOperations.js";
import { cleanDisplay } from "./ui.js";
import { calculatorState, resetCalculator } from "./calculatorState.js";

export const STATE_ZERO = 1;
export const STATE_CAPTURE_A = 2;
export const STATE_CAPTURE_OPERATION = 3;
export const STATE_CAPTURE_B = 4;
export const STATE_EQUALS = 5;

export const ACTION_NUMBER = 1;
export const ACTION_OPERATION = 2;
export const ACTION_RESULT = 3;

let state = calculatorState.state;

const handlers = {
  [STATE_ZERO]: {
    [ACTION_NUMBER]: () => {
      state = STATE_CAPTURE_A;
    },
  },
  [STATE_CAPTURE_A]: {
    [ACTION_NUMBER]: () => {
      state = STATE_CAPTURE_A;
    },
    [ACTION_OPERATION]: (parameter) => {
      state = STATE_CAPTURE_OPERATION;
      calculatorState.operation = parameter;
      calculatorState.a = parseInt(document.getElementById("display").value);
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
    [ACTION_NUMBER]: () => {
      // Continue capturing the second number
      state = STATE_CAPTURE_B;
      calculatorState.state = STATE_CAPTURE_B;
    },
    [ACTION_OPERATION]: () => {
      calculatorState.b = parseInt(document.getElementById("display").value);
      state = STATE_EQUALS;
      equals();
    },
    [ACTION_RESULT]: () => {
      calculatorState.b = parseInt(document.getElementById("display").value);
      state = STATE_EQUALS;
      equals();
    },
  },
  [STATE_EQUALS]: {
    [ACTION_OPERATION]: (parameter) => {
      // Allow chaining operations after equals
      calculatorState.operation = parameter;
      calculatorState.state = STATE_CAPTURE_OPERATION;
      state = STATE_CAPTURE_OPERATION;
      cleanDisplay();
    },
    [ACTION_NUMBER]: () => {
      // If the user starts typing a new number, start over with that as 'a'
      resetCalculator();
      state = STATE_CAPTURE_A;
      calculatorState.state = STATE_CAPTURE_A;
    },
  },
};

function stateMachine(action, parameter) {
  const handler = handlers[state]?.[action];
  if (handler) handler(parameter);
  else console.warn(`No handler for state=${state}, action=${action}`);
}

export { stateMachine, calculatorState, resetCalculator };
