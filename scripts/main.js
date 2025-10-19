/**
 * ============================================================
 * File: [main.js]
 * Purpose: [Entry point and event binding for Calculator Web App.]
 * ------------------------------------------------------------
 * Description:
 * [Initializes the calculator, binds DOM events to UI buttons, and delegates user actions to the state machine.]
 *
 * Dependencies:
 * - [stateMachine] → [Handles calculator logic and state transitions]
 * - [resetCalculator] → [Resets the calculator state and display]
 * - [addDisplay] → [Updates the calculator display]
 * - [OPERATION_ADD, OPERATION_SUBTRACT, OPERATION_TIMES, OPERATION_DIVIDE, OPERATION_PERCENTAGE] → [Operation constants]
 *
 * Exports:
 * - [None; this is the application entry point]
 *
 * Author: Maximiliano González Calzada
 * Project: Calculator Web App
 * Created: [2025-10-14]
 * Last Updated: [2025-10-18]
 * ============================================================
 */

import {
  stateMachine,
  ACTION_NUMBER,
  ACTION_OPERATION,
  ACTION_RESULT,
  ACTION_SIGN_CHANGE,
  ACTION_PERIOD
} from "./stateMachine.js";
import { addDisplay } from "./ui.js";
import {
  OPERATION_ADD,
  OPERATION_SUBTRACT,
  OPERATION_TIMES,
  OPERATION_DIVIDE,
  OPERATION_PERCENTAGE,
} from "./basicOperations.js";
import { resetCalculator } from "./stateMachine.js";

document.addEventListener("DOMContentLoaded", () => {

  /**
   * Adds a click event listener to a button.
   * @param {string} id - The button's HTML id.
   * @param {Function} handler - The function to run on click.
   */
  function onClick(id, handler) {
    document.getElementById(id).addEventListener("click", handler);
  }

  // === NUMBER BUTTONS (0–9) ===
  for (let i = 0; i < 10; i++) {
    onClick(`button${i}`, () => {
      stateMachine(ACTION_NUMBER);
      addDisplay(i);
    });
  }

  // === OPERATION BUTTONS ===
  const operations = {
    buttonAdd: OPERATION_ADD,
    buttonSubstract: OPERATION_SUBTRACT,
    buttonTimes: OPERATION_TIMES,
    buttonDivide: OPERATION_DIVIDE,
    buttonPercentage: OPERATION_PERCENTAGE,
  };

  for (const [id, op] of Object.entries(operations)) {
    onClick(id, () => stateMachine(ACTION_OPERATION, op));
  }

  // === FUNCTION BUTTONS ===
  onClick("buttonEquals", () => stateMachine(ACTION_RESULT));
  onClick("buttonAllClear", () => resetCalculator());
  onClick("buttonNegPos", () => stateMachine(ACTION_SIGN_CHANGE));
  onClick("buttonPeriod", () => stateMachine(ACTION_PERIOD));
});