import {
  stateMachine,
  ACTION_NUMBER,
  ACTION_OPERATION,
  ACTION_RESULT,
  ACTION_SIGN_CHANGE,
  ACTION_PERIOD
} from "./stateMachine.js";
import { addDisplay } from "./ui.js";
import {
  OPERATION_ADD,
  OPERATION_SUBTRACT,
  OPERATION_TIMES,
  OPERATION_DIVIDE,
  OPERATION_PERCENTAGE,
} from "./basicOperations.js";
import { resetCalculator } from "./stateMachine.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Inicializando calculadora");

  function onClick(id, handler) {
    document.getElementById(id).addEventListener("click", handler);
  }

  // Number buttons (0–9)
  for (let i = 0; i < 10; i++) {
    onClick(`button${i}`, () => {
      stateMachine(ACTION_NUMBER);
      addDisplay(i);
    });
  }

  // Operations mapping
  const operations = {
    buttonAdd: OPERATION_ADD,
    buttonSubstract: OPERATION_SUBTRACT,
    buttonTimes: OPERATION_TIMES,
    buttonDivide: OPERATION_DIVIDE,
    buttonPercentage: OPERATION_PERCENTAGE,
  };

  // Assign event listeners for all operation buttons
  for (const [id, op] of Object.entries(operations)) {
    onClick(id, () => {
      stateMachine(ACTION_OPERATION, op);
    });
  }

  // Equals button
  onClick("buttonEquals", () => stateMachine(ACTION_RESULT));

  // AC button
  onClick("buttonAllClear", () => resetCalculator());

  // Sign Change button
  onClick("buttonNegPos", () => stateMachine(ACTION_SIGN_CHANGE));

  // Period button
  onClick("buttonPeriod", () => stateMachine(ACTION_PERIOD));
});
