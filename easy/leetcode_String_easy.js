/**
 * leetcode 字符串部分的练习
 * 每一题没有注释的是根据运行时间 和 代码简洁度综合考虑
 */

/**
 * 题目一：请编写一个函数，其功能是将输入的字符串反转过来。
 * @param {string} s
 * @return {string}
 */
const reverseString = function(s) {
    /* 
    1.非常简单 用自带的split将字符串变成数组 
        然后reverse数组后join成字符串即可
    */
    return s.split('').reverse().join('')
};
//console.log(reverseString('hello'))

/**
 * 题目二：给定一个 32 位有符号整数，将整数中的数字进行反转。
 *  注意:
 *  假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2的31次,  2的31次 − 1]。根据这个假设，如果反转后的整数溢出，则返回 0。
 * @param {number} x
 * @return {number}
 */
const reverse = function(x) {
    /* 
    1.不知道为什么没通过1534236469的测试 明明是小于2的31次
        参照了网上的代码和我并没有什么差别 leetcode的锅？
    */
    if(x <= Math.pow(-2,31) || x >= Math.pow(2,31) - 1){
        return 0;
    }
    if(x >= 0){
       return parseInt(String(x).split('').reverse().join(''));
    }else{
        return -parseInt(String(x).split('').slice(1).reverse().join(''));
    }
};
//console.log(reverse(1534236469));

/**
 * 题目三：给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 * @param {string} s
 * @return {number}
 */
const firstUniqChar = function(s) {
    /* 
    1.老办法 空间换时间
    */
    /* const map = new Map();
    for(let index in s){
        if(map.has(s[index])){
            map.set(s[index],'h');
        }else{
            map.set(s[index],parseInt(index));
        }
    }
    for(let str of map){
        console.log(str[1]);
        if(str[1] != 'h'){
            return str[1];
        }
    }
    return -1; */
    /* 
    2.查看当前元素在之后是否出现
    */
    let i = 0
    let index1 = 0
    let index2 = 0
    while(i < s.length) {
      index1 = s.indexOf(s.charAt(i))
      index2 = s.indexOf(s.charAt(i),index1 + 1)
      if (index2 === -1) {
        return i
      }
      i++
    }
    return -1;
};
//firstUniqChar('leetcode')

/**
 * 题目四：给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的一个字母异位词。
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function(s, t) {
    const map = new Map();
    if(s.length != t.length) return false;
    let length = s.length;
    for(let i = 0;i < length;i++){
        if(map.has(s[i])){
            map.set(s[i], map.get(s[i]) + 1 );
        }else{
            map.set(s[i], 1);
            console.log(s[i])
        }
    }
    for(let i = 0;i < length;i++){
        if(map.has(t[i])){
            if(map.get(t[i]) === 1){
                map.delete(t[i]);
            }else{
                map.set(t[i], map.get(t[i]) - 1 );
            }
        }else{
            return false
        }
    }
    return true;
};
//console.log(isAnagram('anagraxm', 'naagrasm'));

/**
 * 题目五：给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 *  说明：本题中，我们将空字符串定义为有效的回文串。
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = function(s) {
    /* 
    1.过滤掉不是英文和数字的 然后去比对
    */
    const arr = [];
    for(let str of s){
        let _str = str.toUpperCase();
        if(_str >= 'A' && _str <= 'Z' || _str >= '0' && _str <= '9' ){
            arr.push(_str)
        }
    }
    const length = arr.length - 1;
    for(let i = 0;i < length/2;i++){
        if(arr[i] != arr[length - i]){
            return false;
        }
    }
    return true;
};
//console.log(isPalindrome('A man, a plan, a 1c1anal: Panama'));

/**
 * 题目六：实现 atoi，将字符串转为整数。
 *  在找到第一个非空字符之前，需要移除掉字符串中的空格字符。如果第一个非空字符是正号或负号，选取该符号，并将其与后面尽可能多的连续的数字组合起来，这部分字符即为整数的值。如果第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
 *  字符串可以在形成整数的字符后面包括多余的字符，这些字符可以被忽略，它们对于函数没有影响。
 *  当字符串中的第一个非空字符序列不是个有效的整数；或字符串为空；或字符串仅包含空白字符时，则不进行转换。
 * @param {string} str
 * @return {number}
 */
const myAtoi = function(str) {
    let number = parseInt(str);
    if(number.toString() == 'NaN'){
        return 0;
    }
    if(number >= Math.pow(2, 31)){//可以写2147483647做优化
        return Math.pow(2, 31) - 1;
    }
    if(number < Math.pow(-2, 31)){//-2147483648
        return Math.pow(-2, 31);
    }
    return number;
};
//console.log(myAtoi("91283472332"));
//console.log(myAtoi("   w-42"));

/**
 * 题目七：给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = function(haystack, needle) {
    /* 
    1.用正则去匹配
    */
    const _haystack = haystack.trim(),
          _needle = needle.trim();
    if(_needle == ''){
        return 0;
    }
    let n = _haystack.search(_needle);
    console.log(n);
    return n;
    /* 
    2.无话可说
    */
    /* 
    return haystack.indexOf(needle);
    */
};
//strStr('hello', 'bba')