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

const output = document.querySelector(".calculator__output");
let firstDisplayedValue = 0;
let secondDisplayedValue = 0;
let operation = "";
let result = 0;
// useage  : when i try to type after i get a result restart the  output(will not concatinate the inpute value with result)
//and clear the result
let clearAfterEnter = false;

//display
//check if there is an error or a result then start from 0
//else it will concatinate value
const display = value => {
  /** */
  if (
    output.textContent == "Error" ||
    (clearAfterEnter &&
      !["*", "/", "-", "+"].includes(
        output.textContent[output.textContent.length - 1]
      ))
  ) {
    output.textContent = 0;
    result = 0;
    clearAfterEnter = false;
  }

  if (output.textContent == 0) {
    if (value == ".") {
      output.textContent = output.textContent + value;
      console.log("test");
    }
    output.textContent = value;
  } else output.textContent += value;
};

//assing value to first and second operands
const assignValues = value => {
  // if (["+", "-", "*", "/"].includes(value)) return;

  if (operation) {
    if (secondDisplayedValue == 0) {
      if (value == ".") {
        secondDisplayedValue += value;
      }
      console.log("hi");
      secondDisplayedValue = value;
    } else secondDisplayedValue += value;
  } else {
    if (firstDisplayedValue == 0) {
      if (value == ".") {
        firstDisplayedValue += value;
      }
      firstDisplayedValue = value;
    } else firstDisplayedValue += value;
  }

  console.log(firstDisplayedValue, secondDisplayedValue);
};

//lisen for any event on numbers
//call the display and assign value functiont
const numbers = document.querySelectorAll(".number");
numbers.forEach(num => {
  num.addEventListener("click", () => {
    display(num.value);
    assignValues(num.value);
  });
});

//listen for opertion events
const operations = [...document.querySelectorAll(".calculator__key--operator")];
operations.forEach(btn => {
  btn.addEventListener("click", () => {
    //check for previous result for assign the first operand
    if (result /* && result != Infinity */) firstDisplayedValue = result;

    //check if the user have a previous calculation that not done
    //make the old cal ,display it or the error msg
    //and then restart operands and variables
    if (secondDisplayedValue && operation) {
      result =
        operate(
          operation,
          parseFloat(firstDisplayedValue),
          parseFloat(secondDisplayedValue)
        ).toFixed(4) * 1;
      if (!isFinite(result)) {
        output.textContent = "Error";
        //if error disable all bts exept Ac
        operations.forEach(op => (op.disabled = true));
        numbers.forEach(num => (num.disabled = true));
      } else {
        output.textContent = result;
      }
      firstDisplayedValue = 0;
      secondDisplayedValue = 0;
      operation = "";
    }

    //we got here by pressing on an operator means that
    //we must assign the operator to a variable to keep track of that operation
    // if not the last value on the output is an operation then update the operation  and display it

    if (
      !["*", "/", "-", "+"].includes(
        output.textContent[output.textContent.length - 1]
      )
    ) {
      operation = btn.value;
      output.textContent != "Error"
        ? (output.textContent = output.textContent + operation)
        : null;
    }

    console.log(
      "afterOperation",
      firstDisplayedValue,
      secondDisplayedValue,
      operation,
      result
    );
  });
});

//listen action on enter btn
const enter = document.querySelector(".calculator__key--enter");
enter.addEventListener("click", () => {
  //if using a previous calc and set enter it will be assigned to the first operand
  result ? (firstDisplayedValue = result) : null;

  //check for operation and 2nd operand

  if (secondDisplayedValue && operation) {
    result =
      operate(
        operation,
        parseFloat(firstDisplayedValue),
        parseFloat(secondDisplayedValue)
      ).toFixed(4) * 1;

    console.log("result", result);
    if (!isFinite(result)) {
      output.textContent = "Error";
      //desabel all input exept Ac
      operations.forEach(op => (op.disabled = true));
      numbers.forEach(num => (num.disabled = true));
    } else {
      output.textContent = result;
      clearAfterEnter = true;
    }
    firstDisplayedValue = 0;
    secondDisplayedValue = 0;
    operation = "";
  }
  console.log(
    "afterenter",
    firstDisplayedValue,
    secondDisplayedValue,
    operation,
    result
  );
});

//for simplify
const calcAndDisplayResult = (op, FirstOperand, secondOperand) => {
  result = operate(op, parseFloat(FirstOperand), parseFloat(secondOperand));
  result == (Infinity || NaN)
    ? (output.textContent = "Error")
    : (output.textContent = result);
  firstDisplayedValue = 0;
  secondDisplayedValue = 0;
  operation = "";
};

//backspace
//listen on click on del button
//if there is a result from a prievious calc display 0 and get out of the function
//remove the last caracater of the desplay on
//if there is an operation remove last carac from 2nd operand else from the first
const backspace = document.querySelector(".calculator__key--backspace");

backspace.addEventListener("click", () => {
  console.log(
    operation,
    firstDisplayedValue,
    secondDisplayedValue,
    clearAfterEnter
  );

  //when there is a displayed result or Error if you press del it will clear the output
  if (clearAfterEnter || output.textContent == "Error") {
    output.textContent = 0;
    result = 0;
    operations.forEach(op => (op.disabled = false));
    numbers.forEach(num => (num.disabled = false));
    return;
  }

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
//display 0 and restart all variables
const clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
  operations.forEach(op => (op.disabled = false));
  numbers.forEach(num => (num.disabled = false));
  output.textContent = 0;
  firstDisplayedValue = 0;
  secondDisplayedValue = 0;
  operation = "";
  result = 0;
});
