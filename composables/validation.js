const validationMessages = {
  required: 'Please fill this required field!',
  min: 'Please fill at least :min characters in this field!',
  max: 'Please fill not greater than :max characters in this field!',
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
  }
}

const max = (value, minValue) => {

  if (typeof value == 'string') {

    if (value.length > minValue) {

      return validationMessages.max.replace(/\:max/g, minValue);
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