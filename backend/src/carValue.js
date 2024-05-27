function calculateCarValue(model, year) {
  const alphabetPosition = char => char.toLowerCase().charCodeAt(0) - 96;

  let modelValue = 0;
  for (const char of model) {
      if (char.match(/[a-z]/i)) {
          modelValue += alphabetPosition(char);
      }
  }

  return (modelValue * 100) + year;
}

module.exports = calculateCarValue;
