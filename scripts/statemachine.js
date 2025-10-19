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

function setState(newState) {
  state = newState;
  calculatorState.state = newState;
}

function handleSignChange() {
  const display = document.getElementById("display");
  let value = display.value;
  value = sign_change(value);
  display.value = value;
  if (state === STATE_CAPTURE_A) {
    calculatorState.a = value;
    console.log("Sign changed: a = " + calculatorState.a);
  } else if (state === STATE_CAPTURE_B) {
    calculatorState.b = value;
    console.log("Sign changed: b = " + calculatorState.b);
  }
}

function handleOperation(parameter) {
  calculatorState.operation = parameter;
  setState(STATE_CAPTURE_OPERATION);
  cleanDisplay();
}

function finalizeOperation() {
  calculatorState.b = document.getElementById("display").value;
  setState(STATE_EQUALS);
  equals();
}

function handlePeriod() {
  const display = document.getElementById("display");

  // If the display is empty, start with "0."
  if (display.value === "") {
    display.value = "0.";
  } else if (!display.value.includes(".")) {
    // Only add a period if there isn't one already
    display.value += ".";
  }

  // Update the correct operand
  if (state === STATE_CAPTURE_A) calculatorState.a = display.value;
  else if (state === STATE_CAPTURE_B) calculatorState.b = display.value;

  console.log(`Added period, display = ${display.value}`);
}

const handlers = {
  [STATE_ZERO]: {
    [ACTION_NUMBER]: () => {
      setState(STATE_CAPTURE_A);
    },
  },
  [STATE_CAPTURE_A]: {
    [ACTION_NUMBER]: () => {
      setState(STATE_CAPTURE_A);
    },
    [ACTION_OPERATION]: (parameter) => {
      calculatorState.a = document.getElementById("display").value;
      handleOperation(parameter);
    },
    [ACTION_SIGN_CHANGE]: () => {
      handleSignChange();
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
      setState(STATE_CAPTURE_B);
    },
    [ACTION_PERIOD]: handlePeriod,
  },
  [STATE_CAPTURE_B]: {
    [ACTION_NUMBER]: () => {
      // Continue capturing the second number
      setState(STATE_CAPTURE_B);
    },
    [ACTION_OPERATION]: () => {
      finalizeOperation();
    },
    [ACTION_RESULT]: () => {
      finalizeOperation();
    },
    [ACTION_SIGN_CHANGE]: () => {
      handleSignChange();
    },
    [ACTION_PERIOD]: handlePeriod,
  },
  [STATE_EQUALS]: {
    [ACTION_OPERATION]: (parameter) => {
      // Allow chaining operations after equals
      handleOperation(parameter);
    },
    [ACTION_NUMBER]: () => {
      // If the user starts typing a new number, start over with that as 'a'
      resetCalculator();
      setState(STATE_CAPTURE_A);
    },
    [ACTION_SIGN_CHANGE]: () => {
      setState(STATE_CAPTURE_A);
      handleSignChange();
    },
    [ACTION_PERIOD]: () => {
      // Allow editing result as new input
      setState(STATE_CAPTURE_A);
      handlePeriod();
    },
  },
};

function stateMachine(action, parameter) {
  const handler = handlers[state]?.[action];
  if (handler) handler(parameter);
  else console.warn(`No handler for state=${state}, action=${action}`);
}

export { stateMachine, calculatorState, resetCalculator };
