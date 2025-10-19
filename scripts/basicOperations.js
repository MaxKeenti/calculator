import { calculatorState } from "./calculatorState.js";

const { a, b, operation } = calculatorState;

const OPERATION_ADD = 1;
const OPERATION_SUBTRACT = 2;
const OPERATION_TIMES = 3;
const OPERATION_DIVIDE = 4;
const OPERATION_PERCENTAGE = 5;

// Basic operations
function sign_change(value) {
  return -value;
}

// Map operation constants to their functions
const operationHandlers = {
  [OPERATION_ADD]: (a, b) => a + b,
  [OPERATION_SUBTRACT]: (a, b) => a - b,
  [OPERATION_TIMES]: (a, b) => a * b,
  [OPERATION_DIVIDE]: (a, b) => a / b,
  [OPERATION_PERCENTAGE]: (a, b) => (a * b) / 100,
};

function equals() {
  const handler = operationHandlers[calculatorState.operation];
  if (!handler) {
    console.warn(`No handler for operation: ${calculatorState.operation}`);
    return;
  }

  const a = parseFloat(calculatorState.a);
  const b = parseFloat(calculatorState.b);

  const result = handler(a, b);

  const display = document.getElementById("display");
  display.value = result;

  console.log(
    `Calculando: ${a} y ${b} con la operación ${calculatorState.operation} = ${result}`
  );

  // Save the result for chaining
  calculatorState.a = result;
  calculatorState.b = 0;
  calculatorState.state = 1; // Back to STATE_CAPTURE_A
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
