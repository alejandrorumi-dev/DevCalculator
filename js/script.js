const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const deleteBtn = document.querySelector(".btn__delete");

let currentInput = "0";
let operator = null;
let previousInput = null;

function updateDisplay() {
  display.textContent = currentInput;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === "00" || value === "0") {
      // Número
      if (currentInput === "0") {
        currentInput = value;
      } else {
        currentInput += value;
      }
    } else if (value === ".") {
      // Decimal
      if (!currentInput.includes(".")) {
        currentInput += ".";
      }
    } else if (value === "C") {
      // Limpiar
      currentInput = "0";
      previousInput = null;
      operator = null;
    } else if (value === "±") {
      // Cambiar signo
      currentInput = (parseFloat(currentInput) * -1).toString();
    } else if (value === "%") {
      currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (value === "=") {
      // Calcular
      if (operator && previousInput !== null) {
        const result = calculate(previousInput, currentInput, operator);
        currentInput = result.toString();
        operator = null;
        previousInput = null;
      }
    } else {
      // Operador
      operator = value === "x" ? "*" : value === "÷" ? "/" : value;
      previousInput = currentInput;
      currentInput = "0";
    }

    updateDisplay();
  });
});

// Botón borrar
deleteBtn.addEventListener("click", () => {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
});

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error";
    default:
      return b;
  }
}

// Iniciar pantalla
updateDisplay();
