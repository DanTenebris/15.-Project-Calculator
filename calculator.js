/* const operation = prompt('Write a math problem using only two numbers.', 0);
const numbers = operation.match(/(\d[\d\.]*)/g);
const operator = operation.match(/(\+|\-|\/|\*)/g);
console.log(numbers, operator);

if (checkValuesNumbers(numbers, operator)) {
  operate(operator);
} else {
  console.log('error');
} */

const buttonPoint = document.querySelector("#point");

const textarea = document.querySelector('textarea');
textarea.textContent = '';

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    //console.log({ button });
    //console.log(button.className);

    let numbers = (textarea.textContent.match(/(\d[\d\.]*)/g) || 0);
    let operator = textarea.textContent.match(/(\+|\-|\/|[x])/g);


    switch (button.innerText) {
      case '+':
      case '-':
        if ((textarea.textContent.length === 1) &&
          ((textarea.textContent === '+') || (textarea.textContent === '-'))) {
          break;
        } else if (textarea.textContent.length === 0) {
          textarea.textContent += button.innerText;
          break;
        }
      case '=':
      case 'x':
      case '/':
        if (textarea.textContent.length === 0) {
          break;
        }

        if (buttonPoint.disabled === true) {
          buttonPoint.disabled = false;
        }

        if (checkValueQuantity(numbers, operator)) {
          textarea.textContent = operate(operator, numbers);
        }
        textarea.textContent += (button.innerText !== '=') ? button.innerText : '';
        break;

      case 'Clear':
        textarea.textContent = textarea.textContent.slice(0, (textarea.textContent.length - 1));
        break;

      case 'Clear Entry':
        textarea.textContent = '';
        break;

      case '.':
        buttonPoint.disabled = true;
        textarea.textContent += button.innerText;
        break;

      default:
        textarea.textContent += button.innerText;
        break;
    }

  });
});


function operate(operator, numbers) {
  switch (operator.join('')) {
    case '+':
      return add(numbers[0], numbers[1]);
      break;
    case '-':
      return subtract(numbers[0], numbers[1]);
      break;
    case "x":
      return multiply(numbers[0], numbers[1]);
      break;
    case '/':
      return divide(numbers[0], numbers[1]);
      break;

    default:
      return;
      break;
  }
}

function checkValueQuantity(num, operatorValue) {
  if (!(num.length === 2) || !(operatorValue.length === 1)) {
    //return location.reload();
    //window.top.location = window.top.location;
    return false;
  } else {
    return true;
  }
}

function add(a = 0, b = 0) {
  return parseFloat((+a + +b).toFixed(1));
};

function subtract(a = 0, b = 0) {
  return parseFloat((+a - +b).toFixed(1));
};

function multiply(a = 0, b = 0) {
  return parseFloat((+a * +b).toFixed(1));
}

function divide(a = 0, b = 0) {
  if (b !== '0') {
    return parseFloat((+a / +b).toFixed(1));
  } else {
    return 'Undefined';
  }
}