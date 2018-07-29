/**
 * leetcode 回溯算法 普通难度
 */

/**
 * 题目一：电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function(digits) {
    /* 
    1.自己写的蠢办法
    */
    const map = new Map(),
          result = [];
    map.set('2','abc');
    map.set('3','def');
    map.set('4','ghi');
    map.set('5','jkl');
    map.set('6','mno');
    map.set('7','pqrs');
    map.set('8','tuv');
    map.set('9','wxyz');
    /* concat(0, result)
    function concat(index, result){
        if(index >= digits.length)return;
        const words = map.get(digits[index]);
        if(result.length > 0){
            const arr = []
            for(let i = 0;i < words.length; i++){
                for(let str of result){
                    arr.push(str + words[i]);
                }
            }
            result.splice(0, result.length, ...arr);
        }else{
            for(let i = 0;i < words.length; i++){
                result.push(words[i])
            }
        }
        concat(++index, result);
    }
    return result; */
    /* 
    2.参考了leetcode的代码
        递归调用
    */
    const len = digits.length;
    if (!len) return [];
    const ans = [];
    
    function dp(str, from) {
        if (from === len) {
            ans.push(str);
            return;
        }
        const words = map.get(digits[from]);
        for (let i = 0; i < words.length; i ++){
            dp(str + words[i], from + 1);
        }
    }
    dp('', 0);
    return ans;
};
//letterCombinations('232');

/**
 * 题目二：给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function(n) {
    /* 
    穷举 n1是(的次数 n2是)的次数 
        (时sum+1  )时sum-1 所以sum<0则是没有正确闭合括号
    */
    if(n <=0 )return []
    const result = []
    function createResult(str, n1, n2, sum){
        if(sum < 0 || n1 > n || n2 > n){
            return;
        }
        if(n1 == n && n2 == n && sum == 0){
            result.push(str)
        }
        createResult(str + '(', n1 + 1 ,n2 , sum + 1);  
        createResult(str + ')', n1, n2 + 1, sum - 1);  
    }
    createResult('(', 1, 0, 1);
    return result;
};
//console.log(generateParenthesis(3));

/**
 * 题目三：给定一个没有重复数字的序列，返回其所有可能的全排列。
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function(nums) {
    /* 
    1.现在做下来回溯算法感觉就是穷举的递归，在发现错误时不继续递归
    */
    if(!nums.length || nums.length == 0)return nums;
    if(nums.length < 1)return [nums];
    const length = nums.length;
    const result = [];
    function createResult(arr, index){
        if(index == length){
            result.push(arr);
        }
        for (const num of nums) {
            if(!arr.includes(num)){
                const _arr = [...arr];
                _arr.push(num)
                createResult(_arr, index + 1);
            }
        }
    }
    createResult([], 0);
    return result;
};
//permute([0,-1,2])

/**
 * 题目四：求出所有子集
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function(nums) {
    /* 
    1.与前面几题思想一致
        一开始想混了，看了百度的解析后豁然开朗。
        遍历nums 例子[1,2,3]
        最开始是第一项全部放入,
        然后 [1]进入下一层 循环是 [2,3] 便成了[1,2] [1,3]
        [2]下一层 循环是[3]
        [1,2]下一层是[3]
        [1,3]没有下一层
    */
    if(nums.length == 0)return [[]];
    if(nums.length == 1)return [[],nums];
    const length = nums.length;
    const result = [];
    function createResult(arr, index){
        result.push(arr);
        for (let i = index; i < length; i++) {
            const _arr = [...arr];
            _arr.push(nums[i])
            createResult(_arr, i + 1);
        }
    }
    createResult([], 0);
    return result;
};
//subsets([1,2,3])

/**
 * 题目五：单词搜索
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function(board, word) {
    const row = board.length,
          col = board[0].length,
          map = new Map(),
          length = word.length;
    let isFind = false;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            find(i,j,0);
        }
    }
    function find(i, j, index){
        if(i < 0 || i >= row || j < 0 || j >= col)return;
        if(index < length && board[i][j] == word[index] && !map.has(i + '' + j)){
            console.log(i,j,index,map);
            
            if(index == length - 1){
                isFind = true;
                return;
            }
            map.set(i + '' + j,true);
            find(i - 1, j, index + 1);
            if(!isFind && index == 0){
                map.clear();
                map.set(i + '' + j,true);
            }
            find(i, j - 1, index + 1)
            if(!isFind && index == 0){
                map.clear();
                map.set(i + '' + j,true);
            }
            find(i + 1, j, index + 1)
            if(!isFind && index == 0){
                map.clear();
                map.set(i + '' + j,true);
            }
            find(i, j + 1, index + 1)
            if(!isFind && index == 0){
                map.clear();
                map.set(i + '' + j,true);
            }
        }
    }
    console.log(isFind);
    
    return isFind;
};
exist([
["A","B","C","E"],
["S","F","E","S"],
["A","D","E","E"]],'ABCESEEEFS')