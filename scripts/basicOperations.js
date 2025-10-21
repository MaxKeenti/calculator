/**
 * ============================================================
 * File: [basicOperations.js]
 * Purpose: [Implements core arithmetic operations for Calculator Web App.]
 * ------------------------------------------------------------
 * Description:
 * [Defines arithmetic operation constants, their handlers, and provides functions for sign change and calculating results.]
 *
 * Dependencies:
 * - [calculatorState] → [Accesses and updates calculator state]
 * - [addResultDisplay] → [Places the result of an operation into display]
 *
 * Exports:
 * - [equals] → [Performs the selected arithmetic operation and updates state]
 * - [sign_change] → [Changes the sign of a numeric value]
 * - [operationHandlers] → [Maps operation constants to functions]
 * - [OPERATION_ADD, OPERATION_SUBTRACT, OPERATION_TIMES, OPERATION_DIVIDE, OPERATION_PERCENTAGE] → [Operation constants]
 *
 * Author: Maximiliano González Calzada
 * Project: Calculator Web App
 * Created: [2025-10-14]
 * Last Updated: [2025-10-18]
 * ============================================================
 */

import { calculatorState } from "./calculatorState.js";
import { addResultDisplay } from "./ui.js";

// === OPERATION CONSTANTS ===
const OPERATION_ADD = 1;
const OPERATION_SUBTRACT = 2;
const OPERATION_TIMES = 3;
const OPERATION_DIVIDE = 4;
const OPERATION_PERCENTAGE = 5;
const OPERATION_POWER = 6;

/**
 * Changes the sign of a given numeric value.
 * @param {number} value
 * @returns {number} The negated value.
 */
function sign_change(value) {
  return -value;
}

/**
 * Maps operation constants to their respective functions.
 */
const operationHandlers = {
  [OPERATION_ADD]: (a, b) => a + b,
  [OPERATION_SUBTRACT]: (a, b) => a - b,
  [OPERATION_TIMES]: (a, b) => a * b,
  [OPERATION_DIVIDE]: (a, b) => a / b,
  [OPERATION_PERCENTAGE]: (a, b) => (a * b) / 100,
  [OPERATION_POWER]: (a, b) => Math.pow(a, b),
};

/**
 * Performs the selected operation using operands `a` and `b`.
 * Displays the result and updates calculator state.
 */
function equals() {
  const handler = operationHandlers[calculatorState.operation];
  if (!handler) {
    console.warn(`No handler for operation: ${calculatorState.operation}`);
    return;
  }

  const a = parseFloat(calculatorState.a);
  const b = parseFloat(calculatorState.b);
  const result = handler(a, b);

  addResultDisplay(result);

  //console.log(`Calculando: ${a} y ${b} con operación ${calculatorState.operation} = ${result}`);

  calculatorState.a = result;
  calculatorState.b = 0;
  calculatorState.state = 1;
}

export {
  equals,
  sign_change,
  operationHandlers,
  OPERATION_ADD,
  OPERATION_SUBTRACT,
  OPERATION_TIMES,
  OPERATION_DIVIDE,
  OPERATION_PERCENTAGE,
  OPERATION_POWER
};
