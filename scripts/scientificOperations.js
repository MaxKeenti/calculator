/**
 * ============================================================
 * File: [scientificOperations.js]
 * Purpose: [Implements scientific and advanced math operations.]
 * ------------------------------------------------------------
 * Description:
 * [Defines mathematical functions such as trigonometric, logarithmic,
 * exponential, and constant-based operations. Connects with calculatorState
 * to read the current value from the display and show the result.]
 *
 * Dependencies:
 * - [calculatorState] → [Accesses and updates calculator state]
 * - [addResultDisplay] → [Displays the result on the calculator screen]
 *
 * Exports:
 * - [attachScientificHandlers] → [Assigns event listeners to scientific buttons]
 *
 * Author: Maximiliano González Calzada
 * Project: Calculator Web App
 * Created: [2025-10-20]
 * ============================================================
 */

import { calculatorState } from "./calculatorState.js";
import { addResultDisplay } from "./ui.js";

/**
 * Converts degrees to radians.
 */
function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Handles single-argument scientific operations.
 */
function applyUnaryOperation(opName, fn) {
  const display = document.getElementById("display");
  const value = parseFloat(display.value);

  if (isNaN(value)) return;

  const result = fn(value);
  addResultDisplay(result);
  calculatorState.a = result;
  calculatorState.b = 0;
}

/**
 * Attaches event listeners to scientific buttons.
 */
export function attachScientificHandlers() {
  const map = {
    buttonSin: (x) => Math.sin(toRadians(x)),
    buttonCos: (x) => Math.cos(toRadians(x)),
    buttonTan: (x) => Math.tan(toRadians(x)),
    buttonLog: (x) => Math.log10(x),
    buttonLn: (x) => Math.log(x),
    buttonSqrt: (x) => Math.sqrt(x),
  };

  // Apply unary functions
  Object.entries(map).forEach(([id, fn]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () => applyUnaryOperation(id, fn));
    }
  });

  // π constant
  const btnPi = document.getElementById("buttonPi");
  if (btnPi) {
    btnPi.addEventListener("click", () => {
      const display = document.getElementById("display");
      display.value = Math.PI.toFixed(8);
      calculatorState.a = Math.PI;
    });
  }

  // Power function xʸ → needs two inputs
  const btnPow = document.getElementById("buttonPow");
  if (btnPow) {
    btnPow.addEventListener("click", () => {
      const display = document.getElementById("display");
      calculatorState.a = parseFloat(display.value);
      calculatorState.operation = "pow"; // marker for equals()
      display.value = "";
    });
  }
}

/**
 * Executes pending scientific operations that require two operands.
 * (e.g. power operation)
 */
export function handleScientificEquals() {
  if (calculatorState.operation === "pow") {
    const a = parseFloat(calculatorState.a);
    const b = parseFloat(document.getElementById("display").value);
    const result = Math.pow(a, b);
    addResultDisplay(result);
    calculatorState.a = result;
    calculatorState.operation = null;
  }
}