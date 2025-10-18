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

// Map operation constants to their functions
const operationHandlers = {
  [OPERATION_ADD]: add,
  [OPERATION_SUBTRACT]: subtract,
  [OPERATION_TIMES]: times,
  [OPERATION_DIVIDE]: divide,
  [OPERATION_PERCENTAGE]: percentage,
};

function equals() {
  const handler = operationHandlers[operation];
  if (!handler) {
    console.warn(`No handler for operation: ${operation}`);
    return;
  }
  const result = handler(a, b);
  let display = document.getElementById("display");
  display.value = result;
  console.log(`Calculando: ${a} y ${b} con la operación ${operation} = ${result}`);
}

export { add, subtract, times, divide, percentage, equals, operationHandlers };
