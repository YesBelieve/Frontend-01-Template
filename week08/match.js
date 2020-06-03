'use strict'

// 仅支持单一的选择器，不支持复合选择器以及更复杂的选择器
function match(selector, element) {
    if (!selector || !element.attributes) {
        return false;
    }

    // id选择器
    let idRegx = /\#\S+/;
    // 类选择器
    let classRegx = /\.[a-zA-Z0-9]+/;
    // tag选择器
    let tagRegx = /^[a-z]+/;
    // 属性选择器
    let attrRegx = /\[(\S+)=(\S+)\]/;
    // 带匹配的选择器
    let to_match_selector = ['tag', 'id', 'cls', 'attr'];
    // 是否配对成功
    let is_matched = false;

    to_match_selector.forEach((item) => {
        // tag选择器(这里是选择一个选择器类型来初始化is_matched)
        if ('tag' === item) {
            let regx_matched_ret = selector.match(tagRegx);

            if (!regx_matched_ret) {
                is_matched = true;
            } else {
                if (regx_matched_ret[0] !== element.tagName.toLocaleLowerCase()) {
                    is_matched = false;
                } else {
                    is_matched = true;
                }
            }
        }

        if ('id' === item) {
            let regx_matched_ret = selector.match(idRegx);

            if (!regx_matched_ret) {
                is_matched = is_matched && true;
            } else {
                if(regx_matched_ret[0].slice(1) !== element.getAttribute('id')) {
                    is_matched = is_matched && false;
                } else {
                    is_matched = is_matched && true;
                }
            }
        }

        if ('cls' === item) {
            let regx_matched_ret = selector.match(classRegx);

            if (!regx_matched_ret) {
                is_matched = is_matched && true;
            } else {
                if(!element.getAttribute('class').split(' ').includes(regx_matched_ret[0].slice(1))) {
                    is_matched = is_matched && false;
                } else {
                    is_matched = is_matched && true;
                }
            }
        }

        if ('attr' === item) {
            let regx_matched_ret = selector.match(attrRegx);

            if (!regx_matched_ret) {
                is_matched = is_matched && true;
            } else {
                let attr_key = regx_matched_ret[1], attr_value = regx_matched_ret[2];

                if(!element.getAttribute(attr_key).split(' ').includes(attr_value)) {
                    is_matched = is_matched && false;
                } else {
                    is_matched = is_matched && true;
                }
            }
        }
    });

    return is_matched;
}

// console.log('result is ' + match('#id', document.getElementById('id')));
// console.log('result is ' + match('#id2', document.getElementById('id')));
// console.log('result is ' + match('.cls1', document.getElementById('id')));
// console.log('result is ' + match('.cls2', document.getElementById('id')));
// console.log('result is ' + match('.cls3', document.getElementById('id')));
// console.log('result is ' + match('div', document.getElementById('id')));
// console.log('result is ' + match('[id=id2]', document.getElementById('id')));
// console.log('result is ' + match('div#id', document.getElementById('id')));
// module.exports = match;