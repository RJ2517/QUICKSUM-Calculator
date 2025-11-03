// Select display input
const display = document.getElementById('display');
let memory = 0; // For storing memory value

// Theme Toggle
const themeButton = document.getElementById('themeToggle');
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeButton.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Append number or decimal to display
function appendNumber(number) {
  display.value += number;
}

// Append operator (avoid double operators)
function appendOperator(operator) {
  const lastChar = display.value.slice(-1);
  if ("+-*/%".includes(lastChar)) return;
  display.value += operator;
}

// Clear entire display
function clearDisplay() {
  display.value = '';
}

// Delete last character
function deleteChar() {
  display.value = display.value.slice(0, -1);
}

// Perform calculation safely
function calculate() {
  try {
    if (/\/0(?!\d)/.test(display.value)) throw "Divide by zero";
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}


// Allow keyboard input
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || "+-*/.%".includes(e.key)) {
    display.value += e.key;
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    deleteChar();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
// Toggle positive/negative
function toggleSign() {
  if (display.value.startsWith('-')) {
    display.value = display.value.slice(1);
  } else if (display.value !== '') {
    display.value = '-' + display.value;
  }
}

// Square function
function square() {
  try {
    display.value = Math.pow(parseFloat(display.value), 2);
  } catch {
    display.value = "Error";
  }
}

// Square root function
function squareRoot() {
  try {
    let val = parseFloat(display.value);
    if (val < 0) throw "Invalid";
    display.value = Math.sqrt(val);
  } catch {
    display.value = "Error";
  }
}

// Reciprocal function (1/x)
function reciprocal() {
  try {
    let val = parseFloat(display.value);
    if (val === 0) throw "Divide by zero";
    display.value = 1 / val;
  } catch {
    display.value = "Error";
  }
}

// Insert Pi (π) value
function insertPi() {
  // If the display is empty or ends with an operator, append the value
  const lastChar = display.value.slice(-1);
  if (display.value === '' || "+-*/(".includes(lastChar)) {
    display.value += Math.PI;
  } else {
    // Otherwise multiply by π (like "2π" → "2 * π")
    display.value += "*" + Math.PI;
  }
}


// Memory Functions
function memoryAdd() {
  memory += parseFloat(display.value) || 0;
}

function memorySubtract() {
  memory -= parseFloat(display.value) || 0;
}

function memoryRecall() {
  display.value = memory;
}

function memoryClear() {
  memory = 0;
}
