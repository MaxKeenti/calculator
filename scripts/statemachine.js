/**
 * ============================================================
 * File: [stateMachine].js
 * Purpose: [Core finite-state machine controlling calculator logic.]
 * ------------------------------------------------------------
 * Description:
 * [Handles all user actions depending on the current internal state.]
 *
 * Dependencies:
 * - [equals] → [Function that calculates the result coming from a and b operands]
 * - [sign_change] → [Function that changes the sign of the current operand]
 * - [cleanDisplay] → [Function that deletes the content of the display]
 * - [calculatorState] → [The universal state of the calculator that stores its memory and functions]
 * - [resetCalculator] → [Function that resets all values that concern the calculator to default]
 *
 * Exports:
 * - [stateMachine] → [Provides the function of capturing data, operation and redirecting it to result]
 * - [calculatorState] → [Provides current state to be global]
 * - [resetCalculator] → [Provides redirection to the reset of calculator]
 * - [STATE_ZERO] → [Represents the initial state of calculator]
 * - [STATE_CAPTURE_A] → [Represents the state of capture of the first operand]
 * - [STATE_CAPTURE_OPERATION] → [Represents the capture of the operation to be done]
 * - [STATE_CAPTURE_B] → [Represents the state of capture of the second operand]
 * - [STATE_EQUALS] → [Represents the state that redirects to the result of current operation]
 * - [ACTION_NUMBER] → [Represents the action of capturing a number]
 * - [ACTION_OPERATION] → [Represents the action of capturing an operation]
 * - [ACTION_RESULT] → [Represents the action of calling for a result to be placed]
 * - [ACTION_SIGN_CHANGE] → [Represents the action of changing the sign of current operand]
 * - [ACTION_PERIOD] → [Represents the action of adding a period to current operand]
 *
 * Author: Maximiliano González Calzada
 * Project: Calculator Web App
 * Created: [2025-10-14]
 * Last Updated: [2025-10-18]
 * ============================================================
 */

import { equals, sign_change } from "./basicOperations.js";
import { cleanDisplay } from "./ui.js";
import { calculatorState, resetCalculator } from "./calculatorState.js";

// === STATES ===
export const STATE_ZERO = 1;
export const STATE_CAPTURE_A = 2;
export const STATE_CAPTURE_OPERATION = 3;
export const STATE_CAPTURE_B = 4;
export const STATE_EQUALS = 5;

// === ACTIONS ===
export const ACTION_NUMBER = 1;
export const ACTION_OPERATION = 2;
export const ACTION_RESULT = 3;
export const ACTION_SIGN_CHANGE = 4;
export const ACTION_PERIOD = 5;

let state = calculatorState.state;

/**
 * Updates both local and global state reference.
 */
function setState(newState) {
  state = newState;
  calculatorState.state = newState;
}

/**
 * Handles ± button functionality.
 */
function handleSignChange() {
  const display = document.getElementById("display");
  let value = sign_change(display.value);
  display.value = value;

  if (state === STATE_CAPTURE_A) calculatorState.a = value;
  else if (state === STATE_CAPTURE_B) calculatorState.b = value;
}

/**
 * Handles operator input (÷, ×, −, +, %).
 * @param {number} parameter - Operation constant.
 */
function handleOperation(parameter) {
  calculatorState.operation = parameter;
  setState(STATE_CAPTURE_OPERATION);
  cleanDisplay();
}

/**
 * Executes an operation when "=" is pressed.
 */
function finalizeOperation() {
  calculatorState.b = document.getElementById("display").value;
  setState(STATE_EQUALS);
  equals();
}

/**
 * Adds a decimal point to the current input.
 */
function handlePeriod() {
  const display = document.getElementById("display");
  if (display.value === "") display.value = "0.";
  else if (!display.value.includes(".")) display.value += ".";

  if (state === STATE_CAPTURE_A) calculatorState.a = display.value;
  else if (state === STATE_CAPTURE_B) calculatorState.b = display.value;
}

/**
 * Finite-state handlers organized by current state and action.
 */
const handlers = {
  [STATE_ZERO]: {
    [ACTION_NUMBER]: () => setState(STATE_CAPTURE_A),
  },
  [STATE_CAPTURE_A]: {
    [ACTION_NUMBER]: () => setState(STATE_CAPTURE_A),
    [ACTION_OPERATION]: (parameter) => {
      calculatorState.a = document.getElementById("display").value;
      handleOperation(parameter);
    },
    [ACTION_SIGN_CHANGE]: handleSignChange,
    [ACTION_PERIOD]: handlePeriod,
  },
  [STATE_CAPTURE_OPERATION]: {
    [ACTION_NUMBER]: () => setState(STATE_CAPTURE_B),
    [ACTION_PERIOD]: handlePeriod,
  },
  [STATE_CAPTURE_B]: {
    [ACTION_NUMBER]: () => setState(STATE_CAPTURE_B),
    [ACTION_OPERATION]: finalizeOperation,
    [ACTION_RESULT]: finalizeOperation,
    [ACTION_SIGN_CHANGE]: handleSignChange,
    [ACTION_PERIOD]: handlePeriod,
  },
  [STATE_EQUALS]: {
    [ACTION_OPERATION]: handleOperation,
    [ACTION_NUMBER]: () => {
      resetCalculator();
      setState(STATE_CAPTURE_A);
    },
    [ACTION_SIGN_CHANGE]: () => {
      setState(STATE_CAPTURE_A);
      handleSignChange();
    },
    [ACTION_PERIOD]: () => {
      setState(STATE_CAPTURE_A);
      handlePeriod();
    },
  },
};

/**
 * Main state machine dispatcher.
 * @param {number} action - The action triggered by user input.
 * @param {*} [parameter] - Optional operation parameter.
 */
function stateMachine(action, parameter) {
  const handler = handlers[state]?.[action];
  if (handler) handler(parameter);
  else console.warn(`No handler for state=${state}, action=${action}`);
}

export { stateMachine, calculatorState, resetCalculator };
