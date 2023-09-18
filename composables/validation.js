const validationMessages = {
  required: 'Please fill this required field!',
  min: 'Please fill at least :min characters in this field!',
  minNumber: 'The minimal value of this field is :min',
  max: 'Please fill not greater than :max characters in this field!',
  maxNumber: 'The maximal value of this field is :max',
  numeric: 'This field must be numeric value!',
  email: 'Please fill with a valid email formats!'
}

const required = (value) => {
  
  if (!value || value == '') {
    return validationMessages.required;
  }
}

const min = (value, minValue) => {

  if (typeof value == 'string') {

    if (value.length < minValue) {

      return validationMessages.min.replace(/\:min/g, minValue);
    }
  } else if (typeof value == 'number') {

    if (value < minValue) {

      return validationMessages.minNumber.replace(/\:min/g, minValue);
    }
  }
}

const max = (value, maxValue) => {

  if (typeof value == 'string') {

    if (value.length > maxValue) {

      return validationMessages.max.replace(/\:max/g, maxValue);
    } else if (typeof value == 'number') {

      if (value > maxValue) {
  
        return validationMessages.maxNumber.replace(/\:min/g, maxValue);
      }
    }
  } 
}

const numeric = (value) => {

  if (typeof value == 'string') {

    if (typeof parseInt(value) != 'number') {

      return validationMessages.numeric;
    }
  }
}

const email = (value) => {

  const expression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g;

  const checkExpression = expression.test(value);

  if (!checkExpression) {
    
    return validationMessages.email;
  }
}

export {
  required,
  min,
  max,
  numeric,
  email
}