export const updateObject = (oldObject, updatedValues) => {
  return Object.assign({}, oldObject, updatedValues);
};

export function checkValidation(value, rules) {
  let isValid = true;

  if (!rules) return true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
}
