# 每周总结可以写在这里

### Unicode和utf8
#### Unicode
Unicode是一个很大的集合，定义了各个符号对应的编码值。
#### utf8
1. ##### utf8是一种Unicode的实现方式，在互联网上应用广泛(JS中存在可以直接转码和解码的function: )。
2. ##### utf8是一个可变长的编码方式，可以用1-6个字节来表示一个符号，根据不同的符号而变化字节长度。
3. ##### 规则：
    1. 单字节符号, 对应ascii中的128个字符；
    2. N个字节(N>1)，可以通过String.prototype.charCodeAt来查看对应的Unicode值，并依据第4条中的大小区间来判断utf8该用多少字节去表示。
4. ##### Unicode和utf8对应关系:
    1个字节：Unicode码为0 - 127
    2个字节：Unicode码为128 - 2047
    3个字节：Unicode码为2048 - 0xFFFF
    4个字节：Unicode码为65536 - 0x1FFFFF
    5个字节：Unicode码为0x200000 - 0x3FFFFFF
    6个字节：Unicode码为0x4000000 - 0x7FFFFFFF
    utf8二进制表示形式：
    0xxxxxxx
    110xxxxx 10xxxxxx
    1110xxxx 10xxxxxx 10xxxxxx
    11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
5. ##### JS中存在的直接转Unicode的function
    encodeURIComponent(str):使用1-4个转义序列表示字符串中的每个字符的utf8编码，但存在保留字符不会被转义,[A-Z, a-z, 0-9, -, _, ., !, ~, *, ', (, )]。
    encodeURI(str):同上，但保留了部分不会被转义的字符["&", "+", "=", "[", "]"]
### 产生式

### BNF范式