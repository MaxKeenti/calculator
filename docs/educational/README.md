# 🧮 Calculator Web App — Educational Commentary

**Author:** Maximiliano González Calzada  
**Project:** Calculator Web App  
**Purpose:** Educational edition of the project, providing full commentary and analogies for students transitioning from C to modern JavaScript.  
**Last Updated:** 2025-10-19

---

## 📖 Introduction

This document serves as a **comprehensive educational companion** to the Calculator Web App.  
It aims to bridge the conceptual gap between **C programming** and **modern JavaScript** using clear analogies and annotated examples.

Topics demonstrated include:

- Modular JavaScript design (`import` / `export`)
- Event-driven execution instead of procedural `main()`
- Objects as structs and handler tables (function pointers)
- Finite State Machine (FSM) implementation without `switch`
- DOM manipulation and visual feedback

The following sections present annotated previews of all main project scripts with teaching-oriented commentary.

---

## 🧩 1. `basicOperations.js` — Core Arithmetic Logic

**Purpose:** Defines arithmetic operation constants and their associated behaviors.  
**Teaches:** Constants, arrow functions, object maps (function pointer analogies), and modular imports.

```js
/**
 * ============================================================
 * File: [basicOperations.js]
 * Purpose: Implements core arithmetic operations for Calculator Web App.
 * ------------------------------------------------------------
 * Description:
 * Defines arithmetic operation constants, their handlers, and provides
 * functions for sign change and calculating results.
 *
 * Educational Note:
 * Introduces modern JavaScript structures:
 * - Import/export system (like #include but module-based)
 * - Arrow functions (() => {}) replacing small function definitions
 * - Object-as-map behavior (similar to struct with function pointers)
 * ============================================================
 */

import { calculatorState } from "./calculatorState.js"; // Imports shared global state (similar to extern struct)
import { addResultDisplay } from "./ui.js"; // Function for updating calculator display

// === OPERATION CONSTANTS ===
// In C, you’d use #define or enum. Here, 'const' defines immutable values.
const OPERATION_ADD = 1;
const OPERATION_SUBTRACT = 2;
const OPERATION_TIMES = 3;
const OPERATION_DIVIDE = 4;
const OPERATION_PERCENTAGE = 5;

/**
 * Changes the sign of a given numeric value.
 * Equivalent to multiplying by -1 in C.
 */
function sign_change(value) {
  return -value;
}

/**
 * operationHandlers:
 * Maps operation constants to their function logic.
 * Each key corresponds to one arithmetic function.
 *
 * Syntax:
 * - [OPERATION_ADD]: (a, b) => a + b
 *   means "when operation is ADD, run this arrow function."
 *
 * Arrow functions are anonymous, inline definitions.
 * They replace:
 *   int add(int a, int b) { return a + b; }
 */
const operationHandlers = {
  [OPERATION_ADD]: (a, b) => a + b,
  [OPERATION_SUBTRACT]: (a, b) => a - b,
  [OPERATION_TIMES]: (a, b) => a * b,
  [OPERATION_DIVIDE]: (a, b) => a / b,
  [OPERATION_PERCENTAGE]: (a, b) => (a * b) / 100,
};

/**
 * Executes the selected operation (a op b).
 * Updates display and memory accordingly.
 */
function equals() {
  // Equivalent to checking if a function pointer exists before calling
  const handler = operationHandlers[calculatorState.operation];
  if (!handler) {
    console.warn(`No handler for operation: ${calculatorState.operation}`);
    return;
  }

  // parseFloat: converts string input to float (like atof)
  const a = parseFloat(calculatorState.a);
  const b = parseFloat(calculatorState.b);

  // Call the correct arithmetic handler
  const result = handler(a, b);

  // Display result visually
  addResultDisplay(result);

  // Store the result in memory
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
};
```

## ⚙️ 2. `calculatorState.js` — Global State Management

**Purpose:** Provides a shared memory structure across modules.
**Teaches:** Objects as structs, memory resetting, and modular state sharing.

```js
import { cleanDisplay } from "./ui.js"; // Function that clears the display

/**
 * calculatorState:
 * Acts like a "struct" in C containing program-wide variables.
 * Each property can be accessed or modified directly.
 */
export const calculatorState = {
  state: 1, // FSM current state
  operation: null, // Operation constant (e.g., ADD, SUB)
  a: 0, // First operand
  b: 0, // Second operand
};

/**
 * Resets calculator memory and visual display.
 * Equivalent to setting all struct members to default values.
 */
export function resetCalculator() {
  calculatorState.state = 1;
  calculatorState.operation = null;
  calculatorState.a = 0;
  calculatorState.b = 0;
  cleanDisplay(); // Clears screen after reset
}
```

## 🧠 3. `stateMachine.js` — Finite State Machine

**Purpose:** Controls calculator flow using a state/action handler map.
**Teaches:** Replacing switch with object-based dispatch tables, function pointers, and modular FSM design.

```md
┌──────────────┐
│ STATE_ZERO │
└──────┬───────┘
│ number
▼
┌──────────────┐
│ STATE_CAPTURE_A │
└───────────────┘
│ operation
▼
┌──────────────┐
│ STATE_CAPTURE_B │
└───────────────┘
│ =
▼
┌──────────────┐
│ STATE_EQUALS │
└──────────────┘
```

```js
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
  let value = sign_change(display.value);
  display.value = value;
  if (state === STATE_CAPTURE_A) calculatorState.a = value;
  else if (state === STATE_CAPTURE_B) calculatorState.b = value;
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
  if (display.value === "") display.value = "0.";
  else if (!display.value.includes(".")) display.value += ".";
  if (state === STATE_CAPTURE_A) calculatorState.a = display.value;
  else if (state === STATE_CAPTURE_B) calculatorState.b = display.value;
}

/**
 * Handler table — replaces nested switch statements.
 * handlers[state][action] executes the correct function.
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

function stateMachine(action, parameter) {
  const handler = handlers[state]?.[action];
  if (handler) handler(parameter);
  else console.warn(`No handler for state=${state}, action=${action}`);
}

export { stateMachine, calculatorState, resetCalculator };
```

## 🧍‍♂️ 4. `main.js` — Event Binding & Application Entry Point

**Purpose:** Entry point. Connects buttons to the FSM and updates the UI.
**Teaches:** Event-driven flow, arrow functions, and higher-order function usage.

```js
import {
  stateMachine,
  resetCalculator,
  calculatorState,
  ACTION_NUMBER,
  ACTION_OPERATION,
  ACTION_RESULT,
  ACTION_SIGN_CHANGE,
  ACTION_PERIOD,
  STATE_CAPTURE_A,
  STATE_CAPTURE_B,
} from "./stateMachine.js";

import { addDisplay, backspaceDisplay } from "./ui.js";
import {
  OPERATION_ADD,
  OPERATION_SUBTRACT,
  OPERATION_TIMES,
  OPERATION_DIVIDE,
  OPERATION_PERCENTAGE,
} from "./basicOperations.js";

document.addEventListener("DOMContentLoaded", () => {
  // Utility: Simplifies adding event listeners
  function onClick(id, handler) {
    document.getElementById(id).addEventListener("click", handler);
  }

  // Number buttons
  for (let i = 0; i < 10; i++) {
    onClick(`button${i}`, () => {
      stateMachine(ACTION_NUMBER);
      addDisplay(i);
    });
  }

  // Operation buttons
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

  // Function buttons
  onClick("buttonEquals", () => stateMachine(ACTION_RESULT));
  onClick("buttonNegPos", () => stateMachine(ACTION_SIGN_CHANGE));
  onClick("buttonPeriod", () => stateMachine(ACTION_PERIOD));

  // AC / C button behavior
  onClick("buttonAllClear", () => {
    const btn = document.getElementById("buttonAllClear");

    if (
      calculatorState.state === STATE_CAPTURE_A ||
      calculatorState.state === STATE_CAPTURE_B
    ) {
      backspaceDisplay();
      const display = document.getElementById("display");
      if (display.value === "") btn.textContent = "AC";
    } else {
      resetCalculator();
      btn.textContent = "AC";
    }
  });

  // Automatic label change
  document.addEventListener("click", () => {
    const btn = document.getElementById("buttonAllClear");

    if (
      calculatorState.state === STATE_CAPTURE_A ||
      calculatorState.state === STATE_CAPTURE_B
    ) {
      btn.textContent = "C";
    } else {
      btn.textContent = "AC";
    }
  });
});
```

## 🖥️ 5. `ui.js` — Display Manipulation

**Purpose:** Handles updates, limits, and font resizing for the display.
**Teaches:** DOM manipulation, style adjustment, and dynamic element creation.

```js
function cleanDisplay() {
  const display = document.getElementById("display");
  display.value = "";
  display.style.fontSize = "3rem";
}

function addDisplay(value) {
  const display = document.getElementById("display");
  const digitsOnly = display.value.replace(/[-.]/g, "");
  const maxDigits = 20;

  if (digitsOnly.length >= maxDigits) {
    triggerLimitFeedback(display);
    return;
  }

  display.value += value;
  adjustFontSize();
}

function addResultDisplay(value) {
  const display = document.getElementById("display");
  display.value = value;
  adjustFontSize();
}

function adjustFontSize() {
  const display = document.getElementById("display");
  const length = display.value.length;

  const baseSize = 3;
  const minSize = 1.25;
  const maxDigitsBeforeScaling = 8;
  const maxDigits = 20;

  if (length <= maxDigitsBeforeScaling) {
    display.style.fontSize = `${baseSize}rem`;
  } else if (length >= maxDigits) {
    display.style.fontSize = `${minSize}rem`;
  } else {
    const ratio =
      (length - maxDigitsBeforeScaling) / (maxDigits - maxDigitsBeforeScaling);
    const newSize = baseSize - (baseSize - minSize) * ratio;
    display.style.fontSize = `${newSize}rem`;
  }
}

function triggerLimitFeedback(display) {
  const feedback = document.createElement("div");
  feedback.classList.add("input-limit-feedback");
  display.parentElement.style.position = "relative";
  display.parentElement.appendChild(feedback);
  setTimeout(() => feedback.remove(), 600);
}

function backspaceDisplay() {
  const display = document.getElementById("display");
  if (display.value.length > 0) {
    display.value = display.value.slice(0, -1);
    adjustFontSize();
  }
}

export { cleanDisplay, addDisplay, addResultDisplay, backspaceDisplay };
```

## 🧠 6. Key JavaScript ↔ C Concept Table

| JavaScript Concept  | Closest C Analogy         | Description                           |
| ------------------- | ------------------------- | ------------------------------------- |
| const, let          | const, local variables    | Defines variable scope and mutability |
| ()=>{} (arrow)      | Inline / function pointer | Compact anonymous function            |
| import / export     | #include                  | Module linkage between files          |
| Object {}           | struct                    | Named collection of data/functions    |
| DOM manipulation    | I/O operations            | Interaction with UI (input/output)    |
| Event listener      | Function pointer callback | Triggered when events occur           |
| Template string ${} | sprintf                   | Embedding variables in text           |

## 🧭 7. Suggested Exercises

1. Reimplement the FSM using switch statements to reinforce procedural control flow.
2. Replace arrow functions with traditional function() syntax to understand scoping differences.
3. Create a C pseudocode version of one JavaScript module to compare logic translation.
4. Extend ui.js with a "memory recall" button using the existing state structure.

## 🧑‍🏫 8. For Instructors

This documentation can be used as:

- A teaching guide for an introductory JavaScript or Web Programming module.
- A hands-on case study in language paradigm transition (procedural -> event-driven).
- A lab where each student implements one module after reading its annotated preview.

## 📎 Appendix: Visual Summary

```md
User Click → main.js (event) → stateMachine.js (action dispatch)
→ calculatorState.js (updates memory)
→ basicOperations.js (computes)
→ ui.js (updates screen)
```

## 🧩 Note:

The code shown here is not modified in the actual project files.
This README is an educational reference intended to help readers understand the reasoning and design patterns behind the implementation.

---

© 2025 Maximiliano González Calzada — Educational Edition.
