import { equals, sign_change } from "./basicOperations.js";
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
export const ACTION_SIGN_CHANGE = 4;
export const ACTION_PERIOD = 5;

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
      calculatorState.a = document.getElementById("display").value;
      cleanDisplay();
    },
    [ACTION_SIGN_CHANGE]: () => {
      const display = document.getElementById("display");
      let value = display.value;
      value = sign_change(value);
      display.value = value;
      calculatorState.a = value;
      console.log("Sign changed: a = " + calculatorState.a);
    },
    [ACTION_PERIOD]: () => {
      const display = document.getElementById("display");
      let value = display.value;
      value = value + ".";
      display.value = value;
      calculatorState.a = value;
      console.log("Added a period: a = " + calculatorState.a);
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
      calculatorState.b = document.getElementById("display").value;
      state = STATE_EQUALS;
      equals();
    },
    [ACTION_RESULT]: () => {
      calculatorState.b = document.getElementById("display").value;
      state = STATE_EQUALS;
      equals();
    },
    [ACTION_SIGN_CHANGE]: () => {
      const display = document.getElementById("display");
      let value = display.value;
      value = sign_change(value);
      display.value = value;
      calculatorState.b = value;
      console.log("Sign changed: b = " + calculatorState.b);
    },
    [ACTION_PERIOD]: handlePeriod,
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
    [ACTION_PERIOD]: () => {
      // Allow editing result as new input
      state = STATE_CAPTURE_A;
      calculatorState.state = STATE_CAPTURE_A;
      handlePeriod();
    },
  },
};

function stateMachine(action, parameter) {
  const handler = handlers[state]?.[action];
  if (handler) handler(parameter);
  else console.warn(`No handler for state=${state}, action=${action}`);
}

function handlePeriod() {
  const display = document.getElementById("display");
  if (!display.value.includes(".")) {
    display.value += ".";
  }
  if (state === STATE_CAPTURE_A) calculatorState.a = display.value;
  else if (state === STATE_CAPTURE_B) calculatorState.b = display.value;
}

export { stateMachine, calculatorState, resetCalculator };
