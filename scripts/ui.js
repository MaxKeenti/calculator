/**
 * ============================================================
 * File: [ui.js]
 * Purpose: [UI helpers for calculator display manipulation.]
 * ------------------------------------------------------------
 * Description:
 * [Provides functions to clear and update the calculator's display.]
 *
 * Dependencies:
 * - [None]
 *
 * Exports:
 * - [cleanDisplay] → [Clears the calculator display]
 * - [addDisplay] → [Appends value to the calculator display]
 *
 * Author: Maximiliano González Calzada
 * Project: Calculator Web App
 * Created: [2025-10-14]
 * Last Updated: [2025-10-18]
 * ============================================================
 */

/**
 * Clears the calculator display.
 */
function cleanDisplay() {
  document.getElementById("display").value = "";
}

/**
 * Appends a value to the calculator display.
 * @param {string|number} value - Value to display.
 */
function addDisplay(value) {
  const display = document.getElementById("display");
  display.value += value;
}

export { cleanDisplay, addDisplay };