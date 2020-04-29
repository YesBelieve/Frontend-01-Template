function convertStringToNumber(string, x) {

  var chars = string.split('');
  var number = 0, i = 0;

  while (i < chars.length && chars[i] !== '.') {
    number = number * x;
    // chars[i].codePointAt(0) - '0'.codePointAt(0) 转成数字
    number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++; // 坐标后移

    if (chars[i] === '.') {
      i++; // 再后移，进入小数部分

      var fraction = 1; // 小数部分

      while (i < chars.length) {
        fraction = fraction / x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++;
      }
    }
  }

  return number;
}

console.log(convertStringToNumber("F", 10));