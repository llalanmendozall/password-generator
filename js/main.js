const form = document.getElementById("passwordGeneratorForm");
const passwordDisplay = document.getElementById("pass-display");
const longPassword = document.getElementById("pass-range");
const long_default = (document.getElementById("badge").innerHTML =
  longPassword.defaultValue);
const includeSymbolsElement = document.getElementById("Symbols");
const includeNumbersElement = document.getElementById("Numbers");
const includeUppercaseElement = document.getElementById("Uppercase");

document.getElementById("badge").innerHTML = longPassword.value;
// charcode
const LOWERCASE_CHAR_CODES = arrayFromLowtoHigh(97, 122);
const UPPERCASE_CHAR_CODES = arrayFromLowtoHigh(65, 90);
const NUMBER_CHAR_CODES = arrayFromLowtoHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowtoHigh(33, 47)
  .concat(arrayFromLowtoHigh(58, 64))
  .concat(arrayFromLowtoHigh(91, 96))
  .concat(arrayFromLowtoHigh(123, 126));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const longPasswordCharacter = longPassword.value;
  const includeNumbers = includeNumbersElement.checked;
  const includeUppercase = includeUppercaseElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const password = generatePassword(
    longPasswordCharacter,
    includeNumbers,
    includeSymbols,
    includeUppercase
  );
  passwordDisplay.value = password;
});

function generatePassword(
  longPasswordCharacter,
  includeNumbers,
  includeSymbols,
  includeUppercase
) {
  let charcodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) charcodes = charcodes.concat(UPPERCASE_CHAR_CODES);
  if (includeNumbers) charcodes = charcodes.concat(NUMBER_CHAR_CODES);
  if (includeSymbols) charcodes = charcodes.concat(SYMBOL_CHAR_CODES);
  const passwordCharacters = [];
  for (let i = 0; i < longPasswordCharacter; i++) {
    const character = charcodes[Math.floor(Math.random() * charcodes.length)];
    passwordCharacters.push(String.fromCharCode(character));
  }
  return passwordCharacters.join("");
}
function arrayFromLowtoHigh(low, hight) {
  const array = [];
  for (let i = low; i <= hight; i++) {
    array.push(i);
  }
  return array;
}
longPassword.addEventListener("change", function () {
  
  document.getElementById("badge").innerHTML = longPassword.value;
  if (longPassword.value <= 7) {
    document.getElementById("badge").classList.remove("bg-primary");
    document.getElementById("badge").classList.add("bg-danger");
    document.getElementById("progress").classList.add("bg-danger");
    document.getElementById("progress").style.width = "25%";
    document.getElementById("badge").innerHTML =
      longPassword.value + " " + "Débil";
  } else if (longPassword.value <= 10) {
    document.getElementById("badge").classList.remove("bg-danger");
    document.getElementById("badge").classList.add("bg-warning");
    document.getElementById("progress").classList.remove("bg-danger");
    document.getElementById("progress").classList.add("bg-warning");
    document.getElementById("progress").style.width = "50%";
    document.getElementById("badge").innerHTML =
      longPassword.value + " " + "Medio";
  } else {
    document.getElementById("badge").classList.remove("bg-warning");
    document.getElementById("badge").classList.add("bg-success");
    document.getElementById("progress").classList.remove("bg-warning");
    document.getElementById("progress").classList.add("bg-success");
    document.getElementById("progress").style.width = "100%";
    document.getElementById("badge").innerHTML =
      longPassword.value + " " + "Fuerte";
  }
});
