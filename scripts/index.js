let a;
let b;
let operation;
let state;

// Operaciones
const OPERATION_ADD = 1;
const OPERATION_SUBTRACT = 2;
const OPERATION_TIMES = 3;
const OPERATION_DIVIDE = 4;
const OPERATION_PERCENTAGE = 5;

// Estados
const STATE_ZERO = 1;
const STATE_CAPTURE_A = 2;
const STATE_CAPTURE_OPERATION = 3;
const STATE_CAPTURE_B = 4;
const STATE_EQUALS = 5;

// Acciones
const ACTION_NUMBER = 1;
const ACTION_OPERATION = 2;
const ACTION_RESULT = 3;

function load() {
  console.log("Inicializando calculadora");

  for (let index = 0; index < 10; index++) {
    let button = document.getElementById("button" + index);
    button.addEventListener("click", function () {
      pressNumber(index);
    });
  }
  let buttonPunto = document.getElementById("buttonPeriod");
  buttonPunto.addEventListener("click", function () {
    addDisplay(".");
  });

  let buttonSuma = document.getElementById("buttonAdd");
  buttonSuma.addEventListener("click", function () {
    operate(OPERATION_ADD);
  });
  let buttonResta = document.getElementById("buttonSubstract");
  buttonResta.addEventListener("click", function () {
    operate(OPERATION_SUBTRACT);
  });
  let buttonMultiplica = document.getElementById("buttonTimes");
  buttonMultiplica.addEventListener("click", function () {
    operate(OPERATION_TIMES);
  });
  let buttonDivide = document.getElementById("buttonDivide");
  buttonDivide.addEventListener("click", function () {
    operate(OPERATION_DIVIDE);
  });
  let buttonPorcentaje = document.getElementById("buttonPercentage");
  buttonPorcentaje.addEventListener("click", function () {
    operate(OPERATION_PERCENTAGE);
  });
  let buttonCalcular = document.getElementById("buttonEquals");
  buttonCalcular.addEventListener("click", function () {
    stateMachine(ACTION_RESULT);
  });
  state = STATE_ZERO;
}

///////// Funciones de la calculadora

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

//// Funciones de la interfaz de la calculadora

function pressNumber(value) {
  console.log(`Presionando numero: ${value} - state: ${state}`);
  stateMachine(ACTION_NUMBER);
  addDisplay(value);
}

function cleanDisplay() {
  let display = document.getElementById("display");
  display.value = "";
}

function addDisplay(value) {
  console.log(`Agregando al display: ${value}`);
  let display = document.getElementById("display");
  display.value = display.value + value;
}

function operate(operator) {
  console.log(`Presionando operacion: ${operation} - state: ${state}`);
  stateMachine(ACTION_OPERATION, operator);
}

// Handler map for stateMachine
const handlers = {
  [STATE_ZERO]: {
    [ACTION_NUMBER]: function () {
      state = STATE_CAPTURE_A;
    }
  },
  [STATE_CAPTURE_A]: {
    [ACTION_NUMBER]: function () {
      state = STATE_CAPTURE_A;
    },
    [ACTION_OPERATION]: function (parameter) {
      state = STATE_CAPTURE_OPERATION;
      operation = parameter;
      a = parseInt(document.getElementById("display").value);
      cleanDisplay();
    }
  },
  [STATE_CAPTURE_OPERATION]: {
    [ACTION_NUMBER]: function () {
      console.log("cambiando a estado de capturando segundo numero");
      state = STATE_CAPTURE_B;
    },
    [ACTION_OPERATION]: function () {
      state = STATE_CAPTURE_OPERATION;
    }
  },
  [STATE_CAPTURE_B]: {
    [ACTION_OPERATION]: function () {
      b = parseInt(document.getElementById("display").value);
      state = STATE_EQUALS;
      resultado = equals();
    },
    [ACTION_RESULT]: function () {
      b = parseInt(document.getElementById("display").value);
      state = STATE_EQUALS;
      resultado = equals();
    }
  }
};

function stateMachine(action, parameter) {
  const handler = handlers[state]?.[action];
  if (handler) {
    handler(parameter);
  } else {
    console.warn(`No handler for state=${state}, action=${action}`);
  }
}

function equals() {
  console.log(
    `Calculando: ${a} + ${b} en el estado ${state} y operación ${operation}`
  );
  if (operation === OPERATION_ADD) {
    let resultado = add(a, b);
    let display = document.getElementById("display");
    display.value = resultado;
  }
}
