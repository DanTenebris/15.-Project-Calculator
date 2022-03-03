const buttonPoint = document.querySelector("#point");

const textarea = document.querySelector('textarea');

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', () => textAreaInput(button.innerText));
});

document.addEventListener('keydown', e => textAreaInput(e.key));

function textAreaInput(dataInput = false) {
  if (dataInput) {

    if (dataInput === '*') {
      dataInput = 'x';
    }

    if (dataInput === 'Enter') {
      dataInput = '=';
    }

    //I had to remove the "g" flag because it doesn't work properly with the "test" method.
    let patternTest = /(\+|\-|\/|[x]|Clear|Backspace|=|\.|\d[\d\.]*)/;

    if (patternTest.test(dataInput)) {
      switch (dataInput) {
        case '+':
        case '-':
        case '=':
        case 'x':
        case '/':
          if (buttonPoint.disabled === true) {
            buttonPoint.disabled = false;
          }

          const pattern = /(\+|\-|\/|[x]|\d[\d\.]*)/g;
          const textAreaSeparated = (textarea.value.match(pattern) || 0);
          const textAreaLength = textAreaSeparated.length - 1;

          if ((textAreaSeparated.length >= 3) && (textAreaSeparated.length <= 5) &&
            (textAreaSeparated[textAreaLength] !== '+') &&
            (textAreaSeparated[textAreaLength] !== '-') &&
            (textAreaSeparated[textAreaLength] !== 'x') &&
            (textAreaSeparated[textAreaLength] !== '/')) {
            const result = operate(getNumbersAndOperator(textarea.value));
            textarea.value = isNaN(result) ? 'Undefined' : result;
          }

          if (textarea.value.length < 10) {
            textarea.value += (dataInput !== '=') ? dataInput : '';
          }
          break;

        case 'Backspace':
          textarea.value = textarea.value.slice(0, (textarea.value.length - 1));
          break;

        case 'Clear':
          textarea.value = '';
          break;

        case '.':
          if (buttonPoint.disabled) {
            break;
          }
          buttonPoint.disabled = true;
        default:
          if (textarea.value.length < 10) {
            textarea.value += dataInput;
          }
          break;
      }
    }
  }
}

function getNumbersAndOperator(stringValue) {
  const pattern = /(\+|\-|\/|[x]|\d[\d\.]*)/g;
  const patternNumbers = /(\d[\d\.]*)/g;

  const separationArray = stringValue.match(pattern);
  const separationNumbers = stringValue.match(patternNumbers);

  let resultA = [];
  let separatedOperator = '';
  let resultB = [];

  let resultTotal = [];

  for (let i = 0; i < separationArray.length; i++) {
    if (separationArray[i] === separationNumbers[0]) {
      for (let j = 0; j <= i; j++) {
        resultA[j] = separationArray[j];
      }

      i++;
      separatedOperator = separationArray[i];

      i++;
      let countB = 0;
      for (i; i < separationArray.length; i++) {
        resultB[countB] = separationArray[i];
        countB++;
      }
      break;
    }
  }

  resultTotal = [resultA.join(''), separatedOperator, resultB.join('')];
  return resultTotal;
}


function operate(arrayParts) {
  switch (arrayParts[1]) {
    case '+':
      return add(arrayParts[0], arrayParts[2]);
    case '-':
      return subtract(arrayParts[0], arrayParts[2]);
    case "x":
      return multiply(arrayParts[0], arrayParts[2]);
    case '/':
      return divide(arrayParts[0], arrayParts[2]);

    default:
      return;
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