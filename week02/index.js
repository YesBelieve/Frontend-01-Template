'use strict'

function matchNumber(to_match_str) {
  let ret = null;

  if (to_match_str) {
    if (is_String(to_match_str) || is_Number(to_match_str)) {
      // 贪婪模式
      let pattern = /\d+\.?\d*/g;

      ret = String(to_match_str).match(pattern);

      if (null === ret) {
        ret = [];
      }
    } else {
      ret = [];
    }
  } else if (is_Number(to_match_str) && 0 === to_match_str) { // 数字0
    ret = [];
    ret.push("0");
  } else {
    ret = [];
  }

  return ret;
}

function str2utf8(input_str) {
  // 先转utf8
  let encoded = encodeURIComponent(input_str), bytes = [];

  // 遍历字符串
  for (let i = 0; i < encoded.length; i++){
    // 当前字符
    let ch = encoded.charAt(i);

    if ('%' === ch) {
      // 将%后两位拿来转Number
      bytes.push(parseInt(encoded.substring(i + 1, i + 3), 16));
      i = i + 2;
    } else {
      // 单字节，直接返回当前字符的unicode编码
      bytes.push(ch.charCodeAt(0));
    }
  }

  return bytes;
}

function extractStringLiteral(input_str) {
  input_str = input_str || '';
  let ret;

  if (is_String(input_str) || is_Number(input_str)) {
    let pattern = /([^0-9])/g;

    let ret = String(input_str).match(pattern);

    if (null === ret) {
      ret = [];
    }
    return ret;
  } else {
    ret = [];
  }

  return ret;
}

function is_String(input) {
  return '[object String]' === Object.prototype.toString.call(input);
}

function is_Number(input) {
  return '[object Number]' === Object.prototype.toString.call(input);
}