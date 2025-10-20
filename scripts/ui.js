/**
 * ============================================================
 * File: [ui.js]
 * Purpose: [UI helpers for calculator display manipulation.]
 * ------------------------------------------------------------
 * Description:
 * [Provides helper functions to manipulate the calculator display, including clearing, updating, resizing font dynamically, 
 * and visual feedback when input limits are reached.]
 *
 * Dependencies:
 * - [None]
 *
 * Exports:
 * - [cleanDisplay] → [Clears the display and resets font size]
 * - [addDisplay] → [Adds characters to display with input limit check]
 * - [addResultDisplay] → [Displays operation result]
 * - [backspaceDisplay] → [Removes last character from input]
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

  // Enforce 20-character limit (excluding the decimal point and minus sign)
  const digitsOnly = display.value.replace(/[-.]/g, "");
  const maxDigits = 20;

  if (digitsOnly.length >= maxDigits) {
    triggerLimitFeedback(display);
    return; // Prevent further input
  }

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
  const maxDigits = 20; // when it reaches minSize

  if (length <= maxDigitsBeforeScaling) {
    display.style.fontSize = `${baseSize}rem`;
  } else if (length >= maxDigits) {
    display.style.fontSize = `${minSize}rem`;
  } else {
    // interpolate between 3rem and 1.25rem
    const ratio =
      (length - maxDigitsBeforeScaling) / (maxDigits - maxDigitsBeforeScaling);
    const newSize = baseSize - (baseSize - minSize) * ratio;
    display.style.fontSize = `${newSize}rem`;
  }
}

/**
 * Creates a white square overlay that fades away when the input limit is reached.
 * @param {HTMLElement} display
 */
function triggerLimitFeedback(display) {
  const feedback = document.createElement("div");
  feedback.classList.add("input-limit-feedback");
  display.parentElement.style.position = "relative";
  display.parentElement.appendChild(feedback);

  // Remove after animation ends
  setTimeout(() => feedback.remove(), 600);
}

/**
 * Removes the last character from the display.
 */
function backspaceDisplay() {
  const display = document.getElementById("display");
  if (display.value.length > 0) {
    display.value = display.value.slice(0, -1);
    adjustFontSize();
  }
}

export { cleanDisplay, addDisplay, addResultDisplay, backspaceDisplay };
