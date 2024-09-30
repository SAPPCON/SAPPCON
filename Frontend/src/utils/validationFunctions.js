export const noEmptyValidate = (word) => {
  return word.trim().length > 0;
};

export const basicValidate = (word) => {
  const basicPattern = /^(?!.*\s).+$/;
  return basicPattern.test(word);
};

//Solo numeros, sin espacios y no nulo
export const numberValidate = (word) => {
  const basicPattern = /^\d+$/; // Solo números, sin espacios
  return word !== null && basicPattern.test(word);
};

export const numberFormatValidate = (word) => {
  // Expresión regular para verificar solo números, comas y puntos
  const regex = /^[0-9.,]+$/;

  // Verificar que no sea null, vacío o contenga solo espacios en blanco
  return word !== null && word.trim() !== "" && regex.test(word);
};
