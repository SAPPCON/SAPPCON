export const noEmptyValidate = (word) => {
  return word.trim().length > 0;
};

export const basicValidate = (word) => {
  const regex = /^(?!.*\s).+$/;
  return regex.test(word);
};

//Solo numeros, sin espacios y no nulo
export const numberValidate = (word) => {
  const regex = /^\d+$/; // Solo números, sin espacios
  return word !== null && regex.test(word);
};

export const numberFormatValidate = (word) => {
  // Expresión regular para verificar solo números, comas y puntos
  const regex = /^[0-9.,]+$/;

  // Verificar que no sea null, vacío o contenga solo espacios en blanco
  return word !== null && word.trim() !== "" && regex.test(word);
};

export const validateEmail = (word) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(word);
};

export const validatePassword = (password) => {
  const regex = /^(?!.*\s).{8,}$/;
  return regex.test(password);
};
