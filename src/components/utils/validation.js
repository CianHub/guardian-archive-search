export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.pattern) {
    const pattern = /[^a-zA-Z0-9]/;
    isValid = !pattern.test(value) && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
