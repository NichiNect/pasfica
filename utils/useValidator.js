import { required, min, max, numeric, email } from '~/composables/validation';

export const useValidator = (rules, value) => {

  const messages = [];

  for (const rule of rules) {

    const ruleName = rule.split(':')[0];
    const ruleValue = rule.split(':')[1] || null;

    switch (ruleName) {
      case 'required': {
        const validate = required(value);

        if (validate) {
          messages.push(validate);
        }
      } break;
      case 'min': {
        const validate = min(value, ruleValue);

        if (validate) {
          messages.push(validate);
        }
      } break;
      case 'max': {
        const validate = max(value, ruleValue);

        if (validate) {
          messages.push(validate);
        }
      } break;
      case 'numeric': {
        const validate = numeric(value);

        if (validate) {
          messages.push(validate);
        }
      } break;
      case 'email': {
        const validate = email(value);

        if (validate) {
          messages.push(validate);
        }
      } break;
    }
  }

  return messages;
}