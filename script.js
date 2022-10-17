const add = (a, b) => {
  return a + b;
};
const substract = (a, b) => {
  return a - b;
};
const multiply = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  return a / b;
};

const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
};
console.log(operate("*", 5, 4));

//display
const output = document.querySelector(".calculator__output");
let firstDisplayedValue = 0;
let secondDisplayedValue = 0;
let operation = "";
let result = 0;
const display = value => {
  if (value == "ERROR") {
    output.textContent = "ERROR";
    firstDisplayedValue = 0;
    secondDisplayedValue = 0;
    operation = "";
  } else {
    output.textContent =
      output.textContent != 0 ? output.textContent + value : value;
    if (["+", "-", "*", "/"].includes(value)) return;
    if (!operation) {
      firstDisplayedValue =
        firstDisplayedValue != 0 ? firstDisplayedValue + value : value;
    }
    if (operation) {
      secondDisplayedValue =
        secondDisplayedValue != 0 ? secondDisplayedValue + value : value;
    }
  }

  console.log(firstDisplayedValue, secondDisplayedValue);
};

//lisen for any event on numbers
const numbers = document.querySelectorAll(".number");
numbers.forEach(num => {
  num.addEventListener("click", () => {
    display(num.value);
  });
});
//listen for opertion events
const operations = [...document.querySelectorAll(".calculator__key--operator")];

operations.forEach(btn => {
  btn.addEventListener("click", () => {
    result ? (firstDisplayedValue = result) : null;

    if (secondDisplayedValue && operation) {
      result = operate(
        operation,
        parseFloat(firstDisplayedValue),
        parseFloat(secondDisplayedValue)
      );
      output.textContent = result;
      secondDisplayedValue = 0;
      operation = "";
    }
    if (
      !["*", "+", "-", "/"].includes(
        output.textContent[output.textContent.length - 1]
      )
    ) {
      operation = btn.value;
      display(btn.value);
    }
  });
});
//listen action on =
const enter = document.querySelector(".calculator__key--enter");
enter.addEventListener("click", () => {
  if (secondDisplayedValue && operation) {
    result = operate(
      operation,
      parseFloat(firstDisplayedValue),
      parseFloat(secondDisplayedValue)
    );

    output.textContent = result == Infinity ? "Error" : result;
    firstDisplayedValue = 0;
    secondDisplayedValue = 0;
    operation = "";
  }
});

//backspace
const backspace = document.querySelector(".calculator__key--backspace");

backspace.addEventListener("click", () => {
  let text = output.textContent;
  output.textContent = text.slice(0, text.length - 1);
  if (!output.textContent) {
    output.textContent = 0;
  }
  operation
    ? (secondDisplayedValue = secondDisplayedValue.slice(
        0,
        secondDisplayedValue.length - 1
      ))
    : (firstDisplayedValue = firstDisplayedValue.slice(
        0,
        firstDisplayedValue.length - 1
      ));
});

//clear
const clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
  output.textContent = 0;
  firstDisplayedValue = 0;
  secondDisplayedValue = 0;
  operation = "";
});
