function convertNumberToString(number, x) {
  // 整数部分
  let integer = Math.floor(number);
  // 小数部分
  let fraction = number - Math.floor(number);
  let parsed_integer_str = '', parsed_fraction_str = '';

  while (integer > 0) {
    parsed_integer_str = String(integer % x) + parsed_integer_str;
    integer = Math.floor(integer / x);
  }
  while (fraction < 1 && fraction > 0) {
    parsed_fraction_str += String(Math.floor(fraction * x));
    fraction = fraction * x -  Math.floor(fraction * x);
  }

  if (0 === parsed_integer_str.length) {
    parsed_integer_str = '0';
  }

  if (0 !== parsed_fraction_str.length) {
    parsed_fraction_str = '.' + parsed_fraction_str;
  }

  return parsed_integer_str + parsed_fraction_str;
}