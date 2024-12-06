import Validator from 'validatorjs';

export default function validator(body, rules, customMessages, callback) {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
}
