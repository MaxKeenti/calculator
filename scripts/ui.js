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
 * - [addResultDisplay] → [Places operation result into display]
 *
 * Author: Maximiliano González Calzada
 * Project: Calculator Web App
 * Created: [2025-10-14]
 * Last Updated: [2025-10-18]
 * ============================================================
 */

/**
 * Clears the calculator display and restores display font size.
 */
function cleanDisplay() {
  const display = document.getElementById("display");
  display.value = "";
  display.style.fontSize = "3rem";
}

/**
 * Appends a value to the calculator display.
 * @param {string|number} value - Value to display.
 */
function addDisplay(value) {
  const display = document.getElementById("display");
  display.value += value;
  adjustFontSize();
}

/**
 * Appends the result of an operation as a value to the calculator display.
 * @param {string|number} value - Value to display.
 */
function addResultDisplay(value) {
  const display = document.getElementById("display");
  display.value = value;
  adjustFontSize();
}

/**
 * Adjusts the display font size based on the number length.
 */
function adjustFontSize() {
  const display = document.getElementById("display");
  const length = display.value.length;

  const baseSize = 3; // rem
  const minSize = 1.25; // rem
  const maxDigitsBeforeScaling = 8;
  const maxDigits = 16; // when it reaches minSize

  if (length <= maxDigitsBeforeScaling) {
    display.style.fontSize = `${baseSize}rem`;
  } else if (length >= maxDigits) {
    display.style.fontSize = `${minSize}rem`;
  } else {
    // interpolate between 3rem and 1.25rem
    const ratio = (length - maxDigitsBeforeScaling) / (maxDigits - maxDigitsBeforeScaling);
    const newSize = baseSize - (baseSize - minSize) * ratio;
    display.style.fontSize = `${newSize}rem`;
  }
}

export { cleanDisplay, addDisplay, addResultDisplay };