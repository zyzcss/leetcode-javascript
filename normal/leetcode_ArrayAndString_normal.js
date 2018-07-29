/**
 * leetcode数组和字符串部分 普通难度
 */

/**
 * 题目一：矩阵清零。
 *  给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function(matrix) {
    const col = new Map();
    const row = new Map();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] == 0){
                row.set(i, i);
                col.set(j, j);
            }
        }
    }
    if(col.size > 0){
        for (let i of row) {
            matrix[i[0]].fill(0);
        }
        for (let i = 0; i < matrix.length; i++) {
            for (let j of col) {
                matrix[i][j[0]] = 0;
            }
        }
    }
};
const arr = [
    [1,1,1],
    [1,0,1],
    [1,1,1]
];
//setZeroes(arr);

/**
 * 题目二：字谜分组 找出异位词分组（异位词判断参照leetcode_String_easy.js 第四题 此题不用那个做法）
 * 输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
 * 输出:
 * [
 *  ["ate","eat","tea"],
 *  ["nat","tan"],
 *  ["bat"
 * ]
 * @param {string[]} strs
 * @return {string[][]}
 */
const stringSort = function(s) {
    return s.split('').sort().join('');
};
const groupAnagrams = function(strs) {
    /* 
    1.用一个26位的数组记录该单词出现的所以字母数 当做map的key value则是符合该单词出现数的值
    */
    const a = "a".charCodeAt()//97
    const map = new Map()
    for (let i = 0; i < strs.length; i++) {
        let charArr = new Array(26).fill(0);
        for (let j = 0; j < strs[i].length; j++) charArr[strs[i].charCodeAt(j) - a]++
        let key = charArr.join("");
        if (map.has(key)) {
            map.get(key).push(strs[i])
        } else {
            map.set(key, [strs[i]])
        }
    }
    const ans = []
    for (let value of map.values()) {
        ans.push(value)
    }
    return ans;
    /* 
    2.用map记录排序后的字符串 异位词排序后应该是一致的
    */
    /* if(!strs.length || strs.length == 0) return [[]];
    if(strs.length == 1) return [strs];
    const result = [[]];
    result[0].push(strs[0]);
    const map = new Map();
    let len = 0;
    map.set(len,stringSort(strs[0]));
    for (let index = 1; index < strs.length; index++) {
        const element = stringSort(strs[index]);
        let isFind = false;
        for(j of map){
            if(j[1].length == element.length && j[1] == element){//找到 加入数组中
                isFind = true;
                result[j[0]].push(strs[index]);
                break;
            }
        }
        if(!isFind){//未找到 开辟新数组
            result.push([strs[index]]);
            map.set(++len,element);
        }
    }
    return result; */
}
//console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

/**
 * 题目三：三数之和 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
    /* 
    1.思路为 排序后 数组是有序数组，从下标0遍历到length -2,循环内部拿左右指针的数和当前数相加与0比
        比0大则说明右指针太大 向左移 比0小同理左指针右移动。
        注:考虑答案的数组有重复项 所以用map去重
        注：提交时有一个全0的案例，超时了，所以在最前面过滤一遍三个以上的相同数。
    */
    /* if(!nums.length || nums.length < 3)return [];
    const obj = new Map();
    for(let i = nums.length - 1;i >= 0;i--){
        if(obj.has(nums[i])){
            let k = obj.get(nums[i]);
            if(k < 3){
                obj.set(nums[i], ++k)
            }else{
                nums.splice(i,1);
            }
        }else{
            obj.set(nums[i], 1)
        }
    }
    console.log(nums);
    
    nums.sort(function(a, b){
        return a - b;
    });
    const result = [];
    const length = nums.length;
    const map = new Map();
    for(let i = 0;i < length - 2;i++) {
        const now = nums[i];
        let left = i + 1,
            right = length - 1;
        while(left < right){
            const sum = now + nums[left] + nums[right];
            if(sum == 0){
                let isHave = false;
                const str = nums[left] + ',' + nums[right];
                if(map.has(now)){
                    const _map = map.get(now);
                    for(let k of _map.values()){
                        if(k == str){
                            isHave = true;
                            break;
                        }
                    }
                    _map.set(str, str);
                }else{
                    const _map = new Map();
                    _map.set(str, str);
                    map.set(now, _map);
                }
                if(!isHave)result.push([now, nums[left], nums[right]]);
                left++;
                right--;
            }else if(sum > 0){
                right--;
            }else{
                left++;
            }
        }
    }
    console.log(result);
    return result; */
    /* 
    2.大致思路与上面一致
        不同点在于
            ①循环时发现当前指针大于0，则左右指针都大于0，所以不用再去循环
            ②发现nums[i] == nums[i - 1]时，即相同的数，跳过本层循环
            ③while (left < right && nums[left] == nums[left - 1]) left++
             while (left < right && nums[right] == nums[right + 1]) right--
             记录一组成功三数和0的数后，查看下一次左右指针指向的数和上一次是否一致，避免重复
    */
    if(!nums.length || nums.length < 3)return [];
    nums.sort(function(a, b){
        return a - b;
    });
    const result = [];
    const length = nums.length;
    for(let i = 0;i < length - 2;i++) {
        const now = nums[i];
        if(now > 0)break;
        if (i > 0 && nums[i] == nums[i - 1]) {
            continue
        }
        let left = i + 1,
            right = length - 1;
        while(left < right){
            const sum = now + nums[left] + nums[right];
            if(sum == 0){
                result.push([now, nums[left], nums[right]]);
                left++;
                right--;
                while (left < right && nums[left] == nums[left - 1]) left++
                while (left < right && nums[right] == nums[right + 1]) right--
            }else if(sum > 0){
                right--;
            }else{
                left++;
            }
        }
    }
    return result;
};
//threeSum([-1, 0, 1, 2, -1, -4])

/**
 * 题目四：无重复字符的最长子串 
 *  给定一个字符串，找出不含有重复字符的最长子串的长度。
 *  给定 "abcabcbb" ，没有重复字符的最长子串是 "abc" ，那么长度就是3。
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
    /* 
    1.map记录出现过的字符 arr记录当前的字符串
        找到重复后，将数组中该字符前包括本身删去，map中也是
    */
    /* const map = new Map(),
          arr = [];
    let max = 0;
    for (let index = 0; index < s.length; index++) {
        const str = s[index];
        if(map.has(str)){
            max = Math.max(max,arr.length);
            let i = arr.indexOf(str);
            while(i > 0){
                map.delete(arr[0]);
                arr.shift();
                i--;
            }
            arr.shift();
            arr.push(str);
        }else{
            map.set(str, str);
            arr.push(str)
        }
    }
    max = Math.max(max,arr.length);
    return max; */
    /*  
    2.index是当前搜索字符在字符串中的位置（以当前子串为搜索起点）
        index < i 就是发现重复，重置flag(当前子串的起点)
    */
    if (!s.length) return 0;
    let max = 1, flag = 0
    for(let i = 0; i < s.length; i++) {
        const index = s.indexOf(s[i], flag) 
        if (index !== -1 && index < i) flag = index + 1;
        max = Math.max(max, i - flag + 1)
    }
    return max
};
/* lengthOfLongestSubstring('pwwkew')
lengthOfLongestSubstring('dvdf') */

/**
 * 题目五：给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为1000。
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function(s) {
    /* 
    从字符串最左边遍历到字符串的倒数第二位
        每次遍历：
            找到当前字符与字符串中lastIndexOf相比，找得到去判断是否回文，找不到跳过。
        注：优化点 在找到的回文字符串大于剩下的字符串时，跳出循环。
    */
    let str = '';
    const length = s.length;
    if(length <= 1)return s;
    for(let i = 0;i < length - 1;i++){
        let index = s.lastIndexOf(s[i]);
        while(index != i && index != -1){
            const _str = s.slice(i, index + 1);
            if(isPalindrome(_str)){
                if(_str.length > str.length)str = _str;
                break;
            };
            index = s.lastIndexOf(s[i], index - 1);
        }
        if(str.length >= length - i){
            break;
        }
    }
    if(str.length == 0)return s[0];
    return str;
};
const isPalindrome = function(s) {
    const length = s.length - 1;
    for(let i = 0;i < length/2;i++){
        if(s[i] != s[length - i]){
            return false;
        }
    }
    return true;
};
//longestPalindrome('abcba');

/**
 * 题目六：给定一个未排序的数组，请判断这个数组中是否存在长度为3的递增的子序列。
 *  例：1 2 7 5 true 5 3 1 2 1 false
 * @param {number[]} nums
 * @return {boolean}
 */
const increasingTriplet = function(nums) {
    let first = second = Number.MAX_VALUE;
    for (let i = 0; i < nums.length; i++) {
        const now = nums[i];
        if(now < first){
            first = now;
            continue;
        }
        if(now > first && now < second){
            second = now;
            continue;
        }
        if(now > second && second > first){
            return true;
        }
    }
    return false;
};
//console.log(increasingTriplet([1,2,1,1]));

