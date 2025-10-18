import { stateMachine } from "./stateMachine.js";
import { addDisplay } from "./ui.js";

function load() {
  console.log("Inicializando calculadora");

  for (let i = 0; i < 10; i++) {
    document.getElementById(`button${i}`).addEventListener("click", () => {
      stateMachine(ACTION_NUMBER);
      addDisplay(i);
    });
  }

  // Operation buttons
  document
    .getElementById("buttonAdd")
    .addEventListener("click", () =>
      stateMachine(ACTION_OPERATION, OPERATION_ADD)
    );
  document
    .getElementById("buttonSubstract")
    .addEventListener("click", () =>
      stateMachine(ACTION_OPERATION, OPERATION_SUBTRACT)
    );
  document
    .getElementById("buttonTimes")
    .addEventListener("click", () =>
      stateMachine(ACTION_OPERATION, OPERATION_TIMES)
    );
  document
    .getElementById("buttonDivide")
    .addEventListener("click", () =>
      stateMachine(ACTION_OPERATION, OPERATION_DIVIDE)
    );
  document
    .getElementById("buttonPercentage")
    .addEventListener("click", () =>
      stateMachine(ACTION_OPERATION, OPERATION_PERCENTAGE)
    );
  document
    .getElementById("buttonEquals")
    .addEventListener("click", () => stateMachine(ACTION_RESULT));
}
window.addEventListener("DOMContentLoaded", load);
