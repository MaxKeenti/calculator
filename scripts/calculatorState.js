/**
 * ============================================================
 * File: [calculatorState.js]
 * Purpose: [Defines and manages the shared calculator state object.]
 * ------------------------------------------------------------
 * Description:
 * [Provides a universal state object for the calculator. Exposes state and reset functionality for use by other modules.]
 *
 * Dependencies:
 * - [cleanDisplay] → [Clears the calculator display]
 *
 * Exports:
 * - [calculatorState] → [Global calculator state object]
 * - [resetCalculator] → [Resets calculator state and display]
 *
 * Author: Maximiliano González Calzada
 * Project: Calculator Web App
 * Created: [2025-10-14]
 * Last Updated: [2025-10-18]
 * ============================================================
 */

import { cleanDisplay } from './ui.js'

/**
 * Global calculator state object.
 * Tracks operands, operation type, and current state machine stage.
 */
export const calculatorState = {
  state: 1,
  operation: null,
  a: 0,
  b: 0,
};

/**
 * Resets calculator state and clears the display.
 */
export function resetCalculator() {
  calculatorState.state = 1;
  calculatorState.operation = null;
  calculatorState.a = 0;
  calculatorState.b = 0;
  cleanDisplay();
}