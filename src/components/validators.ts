import CC from "card-validator";
import CPF from "cpf-check";

const phoneValidator = {
  mask(value: string) {
    return value
      .replace(/\D/g, "") // 1. remove all non digit characters
      .replace(/(\d{2})(\d)/, "($1) $2") // 2. capture 2 numbers and put between parenthesis, these are the DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // 3. capture 5 numbers and put before a dash, these are the first half of the number
      .replace(/(.{15})(.)/, "$1"); // 4. limit to 15 characters
  },
  validate(value: string) {
    return value.length == 15;
  },
};

const cardNumberValidator = {
  mask(value: string) {
    return value
      .replace(/\D/g, "") // 1. remove all non digit characters
      .replace(/(\d{4})(\d)/, "$1 $2") // 2. separate 4 digits
      .replace(/(\d{4})(\d)/, "$1 $2") // 3. separate 4 digits
      .replace(/(\d{4})(\d)/, "$1 $2") // 4. separate 4 digits
      .replace(/(.{19})(.)/, "$1"); // 4. limit to 19 characters
  },
  validate(value: string) {
    // not 19 because AMEX cards have 1 digit less.
    // return value.length >= 18;
    return CC.number(value).isValid;
  },
};

const cpfValidator = {
  mask(value: string) {
    return value
      .replace(/\D/g, "") // 1. remove all non digit characters
      .replace(/(\d{3})(\d)/, "$1.$2") // 2. separate 3 digits
      .replace(/(\d{3})(\d)/, "$1.$2") // 3. separate 3 digits
      .replace(/(\d{3})(\d)/, "$1-$2") // 4. separate 3 digits
      .replace(/(.{14})(.)/, "$1"); // 5. limit to 14 characters
  },
  validate(value: string) {
    // not 19 because AMEX cards have 1 digit less.
    // return value.length >= 18;
    return CPF.validate(value);
  },
};

const emailValidator = {
  mask(value: string) {
    return value.slice(0, 75);
  },
  validate(value: string) {
    // not 19 because AMEX cards have 1 digit less.
    // return value.length >= 18;
    return new RegExp(/[a-zA-Z0-9._]+@.{5,7}\..{3}/g).test(value);
  },
};

export default {
  email: emailValidator,
  cpf: cpfValidator,
  phone: phoneValidator,
  cardNumber: cardNumberValidator,
};
