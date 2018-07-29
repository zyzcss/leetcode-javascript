/**
 * leetcode 其他部分的练习
 */

/**
 * 题目一：编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位数为 ‘1’ 的个数（也被称为汉明重量）。
 * @param {number} n - a positive integer
 * @return {number}
 */
const hammingWeight = function(n) {
    const two = n.toString(2);
    let len = 0;
    for(let i = two.length - 1;i >= 0;i--){
        if(two[i] == '1')len++;
    }
    return len;
};
console.log(hammingWeight(-1));

/**
 * 题目二：杨辉三角
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = function(numRows) {
    const nums = [];
    for(let i = 0;i < numRows;i++){
        nums[i] = [];
        nums[i].push(1);
        for(let j = 1;j < i;j++){
            nums[i].push(nums[i - 1][j - 1] + nums[i - 1][j] )
        }
        if(i > 0)nums[i].push(1);
    }
    return nums;
};
//generate(5);

/**
 * 题目三：有效的括号
 *  给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) {
    /* 
    栈记录括号出现
    */
    const arrs = [];
    for(str of s){
        switch(str){
            case '(':
                arrs.unshift('a');
                break;
            case ')':
                if(arrs[0] == 'a'){
                    arrs.shift()
                }else{
                    return false;
                }
                break;
            case '{':
                arrs.unshift('b');
                break;
            case '}':
                if(arrs[0] == 'b'){
                    arrs.shift()
                }else{
                    return false;
                }
                break;
            case '[':
                arrs.unshift('c');
                break;
            case ']':
                if(arrs[0] == 'c'){
                    arrs.shift()
                }else{
                    return false;
                }
                break;
        }
    }
    if(arrs.length > 0)return false;
    return true;
};
//console.log(isValid('[}]'));

/**
 * 题目四：缺失数据
 * @param {number[]} nums
 * @return {number}
 */
const missingNumber = function(nums) {
    const length = nums.length;
    let sum = length*(length + 1)/2;
    for(num of nums){
        sum -= num;
    }
    return sum;
};
missingNumber([0])