import { calculatorState } from "./calculatorState.js";

const { a, b, operation } = calculatorState;

const OPERATION_ADD = 1;
const OPERATION_SUBTRACT = 2;
const OPERATION_TIMES = 3;
const OPERATION_DIVIDE = 4;
const OPERATION_PERCENTAGE = 5;

// Basic operations
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function times(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function percentage(a, b) {
  return (a * b) / 100;
}
function sign_change(value) {
  return -value;
}

// Map operation constants to their functions
const operationHandlers = {
  [OPERATION_ADD]: add,
  [OPERATION_SUBTRACT]: subtract,
  [OPERATION_TIMES]: times,
  [OPERATION_DIVIDE]: divide,
  [OPERATION_PERCENTAGE]: percentage
};

function equals() {
  const handler = operationHandlers[calculatorState.operation];
  if (!handler) {
    console.warn(`No handler for operation: ${calculatorState.operation}`);
    return;
  }
  const result = handler(calculatorState.a, calculatorState.b);
  let display = document.getElementById("display");
  display.value = result;
  console.log(
    `Calculando: ${calculatorState.a} y ${calculatorState.b} con la operación ${calculatorState.operation} = ${result}`
  );
  calculatorState.a = result;
  calculatorState.b = 0;
  calculatorState.state = 1; // Back to STATE_CAPTURE_A
}

export {
  add,
  subtract,
  times,
  divide,
  percentage,
  equals,
  sign_change,
  operationHandlers,
  OPERATION_ADD,
  OPERATION_SUBTRACT,
  OPERATION_TIMES,
  OPERATION_DIVIDE,
  OPERATION_PERCENTAGE
};
