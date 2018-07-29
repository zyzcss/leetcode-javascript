/**
 * leetcode 数组部分的练习
 * 每一题没有注释的是根据运行时间 和 代码简洁度综合考虑
 * 注：for in效率较慢
 */

/**
 * 题目一：给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
    不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function(nums) {
    /* 
    1.使用Set去重复 然后Array.from转换成数组 */
    //nums = Array.from(new Set(nums));
    /* 
    2.上面那种的简写 */
    nums = [...new Set(nums)];
    /* 
    3.逆序遍历 用空间复杂度换取时间复杂度（不符合题意） */
    /* let numObj = {};
    for(let index=nums.length - 1;index > -1;index--){
        if(numObj['type' + nums[index]] !== undefined){
            nums.splice(index, 1);
        }
        numObj['type' + nums[index]] = 'have';
    } */
    /* 
    4.顺序遍历 用两个指针控制 一个控制遍历数组 一个控制生成新数组（官方答案）
    */
    /* let j = 0;
    for(let i = 0;i<nums.length;i++){
        if(nums[i] != nums[j]){
            j++;
            nums[j] = nums[i];
        }
    }
    nums.splice(j+1,nums.length-j-1); */
    return nums.length;
};
//removeDuplicates([0,0,1,1,1,2,2,3,3,4]);

/**
 * 题目二：给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 *  设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
 *  注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function(prices) {
    /* 
    1.疯狂if 
        可以知道什么时候买入卖出
        买入：
            找到后面有一天比当天高 且两者中间没有比当天低的[1,4,6]
        跳过当天：
            暂未找到比当天高的 且后一天比当天低：[9,4,1]
        卖出：
            [1,2,3,4]中间没有低点 最后卖出
            [1,2,1,4]中间有低点 之前的最高点卖出
     */
    /* let money = 0;
    for(let i = 0;i<prices.length;i++){
        const today = prices[i];
        let nowmax = today,
            k = i;
        for(let j = i+1;j<prices.length;j++){
            if(prices[j] > nowmax){
                nowmax = prices[j];
                k = j;
            }
            if(k == i && prices[j] < nowmax){
                i = j;
                break;
            }
            if(k != i && prices[j] < nowmax){
                money += nowmax - today;
                i = k;
                break;
            }
        }
        if(k != i){
            money += nowmax - today;
            i = k;
        }
    }
    console.log(money)
    return money; 
    */
   /* 
    2.后一天与当天匹配 大则计算金额（不能知道具体哪天卖出 计算利润效率最高）
   */
    let result = 0;
    for(let i=0;i<prices.length-1;i++){
        if(prices[i+1]>prices[i]){
            result += prices[i+1]-prices[i]
        }
    }
    return result
};
//maxProfit([7,1,5,3,6,4])

/**
 * 题目三：给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function(nums, k) {
    /* 
    1.将要放到前面的splice出来 然后循环放进去
    注: nums = concatArry.concat(nums) 不能改变外面的数组
    */
    /* let length = nums.length - 1,
        concatArry = nums.splice(length - k + 1,length);
    for(let i = concatArry.length - 1;i >= 0;i--){
        nums.unshift(concatArry[i])
    } */
    /* 
    2.边取边放（简洁 效率）
     */
    for(let i = 0;i < k;i++){
        nums.unshift(nums.pop());
    }
};
//rotate([1,2,3,4,5,6,7],3);

/**
 * 题目四：给定一个整数数组，判断是否存在重复元素。存在返回true，否则返回false。
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = function(nums) {
    /* 
    1.map空间复杂度换时间复杂度
    */
    /* const map = new Map();
    for(let i = 0;i<nums.length;i++){
        if(!map.has(nums[i])){
            map.set(nums[i], true)
        }else{
            return true;
        }
    }
    return false; */
    /* 
    2.利用set
    */
    const set = new Set(nums)
    return set.size != nums.length
};
//containsDuplicate([1,1,1,2,3]);

/**
 * 题目五：给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = function(nums) {
    /* 
    1.循环 查看第一次出现和最后一次出现是否一致
    */
    /* for(num of nums){
        if(nums.indexOf(num) == nums.lastIndexOf(num)){
            return num
        }
    } */
    /* 
    2.^是异或操作 0与一个数两次异或后返回的仍旧是0 以此找出只有一个的数（简洁 效率）
    */
    let result = 0
    for(num of nums){
        result = result ^ num
    }
    return result
};
//singleNumber([1,2,2,1,53])

/**
 * 题目六：给定两个数组，写一个方法来计算它们的交集。
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersect = function(nums1, nums2) {
    /* 
    1.老办法 空间换时间
    */
    /* const map = new Map();
    for(let num of nums1){
        if(!map.has(num)){
            map.set(num, 1)
        }else{
            let i = map.get(num);
            map.set(num, ++i);
        }
    }
    let result = [];
    for(let num of nums2){
        if(map.has(num)){
            let i = map.get(num);
            map.set(num, --i);
            if(map.get(num) <= 0)map.delete(num);
            result.push(num);
        }
    } 
    return result;
    */
   /* 
   2.先判定哪个数组比较短 用短的当儿子作为键去父中遍历
   */
    const len1 = nums1.length;
    const len2 = nums2.length;
    const parent = len1 > len2 ? nums1 : nums2;
    const child = len1 > len2 ? nums2 : nums1;
    const newArr = [];
    for (let i = 0; i < child.length; i++) {
        if (parent.includes(child[i])) {
            // 把父数组中匹配的元素删除
            parent.splice(parent.indexOf(child[i]),1)
            newArr.push(child[i])
        }
    }
    console.log(newArr)
    return newArr;
};
//intersect([1,2,2,1],[2,2,1]);

/**
 * 题目七：给定一个非负整数组成的非空数组，在该数的基础上加一，返回一个新的数组。
 *  输入[9,9]返回[1,0,0]
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = function(digits) {
    /* 
    从尾循环到头 如果9进位 否则直接加1退出循环
    */
    for(let i = digits.length - 1;i>=0;i--){
        if(digits[i] < 9){
            digits[i] += 1;
            break;
        }else{
            digits[i] = 0
            if(i == 0){
                digits.unshift(1);
            }
        }
    }
    return digits;
};
//plusOne([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]);

/**
 * 题目八：给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = function(nums) {
    /* 
    1.尾部循环 找到0删除放最后
    */
    for(let i= nums.length - 1;i>=0;i--){
        if(nums[i] == 0){
            nums.splice(i, 1);
            nums.push(0);
        }
    }
    /* 
    2.leetcode里提交数最多的
    */
    /* let zeroIndex = 0, notZero = 0;
    if(!nums.length) return;
    while(notZero < nums.length){
        if(nums[notZero] == 0){
            notZero++;
            continue;
        }else{
            console.log(zeroIndex,notZero);
            [nums[zeroIndex], nums[notZero]] =  [nums[notZero], nums[zeroIndex]];
        }
        notZero++;
        zeroIndex++;
    }
    console.log(nums); */
};
//moveZeroes([0,0,1,1])

/**
 * 题目九：给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
    /* 
    1.双重循环
    */
    for(let i = 0;i<nums.length;i++){
        const k = target - nums[i]
        for(let j = i + 1;j<nums.length;j++){
            if(nums[j] === target){
                return [i,j];
            }
        } 
        /* const index = nums.lastIndexOf(k);
        console.log(i,index,k)
        if(index > 0 && index != i){
            return [i,index];
        } */
    }
    return [];
    /* 
    2.照旧空间换时间 略
    */
};
//twoSum([3,3],6);

/**
 * 题目十：判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。
 *  横向 竖向 九个3x3格 1-9只出现一次
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = function(board) {
    /* 
    1.空间换时间 
        找出横向纵向规律
        九个3x3的规律
        找到存在的数就返回false
    */
    for(let i = 0;i < 9;i++){
        const rowObj = new Map();
        const colObj = new Map();
        const gridObj = new Map();
        for(let j = 0;j < 9;j++){
            const num = board[i][j];
            if(num != '.' && rowObj.has(num)){
                return false;
            }else{
                rowObj.set(num,true);
            }
            const num2 = board[j][i];
            if(num2 != '.' && colObj.has(num2)){
                return false;
            }else{
                colObj.set(num2,true);
            }
            //i = 0  000111222  =1 000111222 =2 000111222 =3 333444555
            //j = 0  036036036  =1 147147147 =2 258258258
            //console.log(Math.floor(j / 3) + Math.floor(i / 3) * 3,i % 3 * 3 + j % 3);
            const num3 = board[Math.floor(j / 3) + Math.floor(i / 3) * 3][i % 3 * 3 + j % 3];
            if(num3 != '.' && gridObj.has(num3)){
                return false;
            }else{
                gridObj.set(num3,true);
            }
        }
    }
    return true;
};
isValidSudoku([
    ["1","3","4",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]);

/**
 * 题目十一：给定一个 n × n 的二维矩阵表示一个图像。将图像顺时针旋转 90 度。
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotateMatrix = function(matrix) {
    /* 
    1.不占用额外的数组 找规律没找到什么头绪 参考了百度出来的答案
    */
    const n = matrix.length;
    for(let i = 0;i < Math.floor(n/2);i++){
        for(let j = i;j < n - 1 - i;j++){
            [matrix[i][j], matrix[n-1-j][i], matrix[n-1-i][n-1-j], matrix[j][n-1-i]] = 
                [matrix[n-1-j][i], matrix[n-1-i][n-1-j], matrix[j][n-1-i], matrix[i][j]];
        }
    }
};
rotateMatrix([
    [ 5, 1, 9,11],
    [ 2, 4, 8,10],
    [13, 3, 6, 7],
    [15,14,12,16]
])
