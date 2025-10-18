import {
  stateMachine,
  ACTION_NUMBER,
  ACTION_OPERATION,
  ACTION_RESULT,
} from "./stateMachine.js";
import { addDisplay } from "./ui.js";
import {
  OPERATION_ADD,
  OPERATION_SUBTRACT,
  OPERATION_TIMES,
  OPERATION_DIVIDE,
  OPERATION_PERCENTAGE,
} from "./basicOperations.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Inicializando calculadora");

  // 🔢 Number buttons (0–9)
  for (let i = 0; i < 10; i++) {
    const button = document.getElementById(`button${i}`);
    button.addEventListener("click", () => {
      stateMachine(ACTION_NUMBER);
      addDisplay(i);
    });
  }

  // ➕ Operations mapping
  const operations = {
    buttonAdd: OPERATION_ADD,
    buttonSubstract: OPERATION_SUBTRACT,
    buttonTimes: OPERATION_TIMES,
    buttonDivide: OPERATION_DIVIDE,
    buttonPercentage: OPERATION_PERCENTAGE,
  };

  // ⚙️ Assign event listeners for all operation buttons
  for (const [id, op] of Object.entries(operations)) {
    document.getElementById(id).addEventListener("click", () => {
      stateMachine(ACTION_OPERATION, op);
    });
  }

  // 🟰 Equals button
  document
    .getElementById("buttonEquals")
    .addEventListener("click", () => stateMachine(ACTION_RESULT));
});
