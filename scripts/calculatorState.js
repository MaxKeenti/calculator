import { cleanDisplay } from './ui.js'
// calculatorState.js

// Centralized calculator state object
// This object is shared across all modules by reference.
// Any change made here will be visible everywhere it's imported.
export const calculatorState = {
  state: 1,        // Initial state (matches STATE_ZERO)
  operation: null, // Current operation (+, -, *, /, etc.)
  a: 0,            // First operand
  b: 0,            // Second operand
};

// 🧹 Function to reset calculator state to initial values
export function resetCalculator() {
  calculatorState.state = 1;
  calculatorState.operation = null;
  calculatorState.a = 0;
  calculatorState.b = 0;
  cleanDisplay();
}