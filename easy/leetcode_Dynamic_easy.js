/**
 * leetcode 动态规划的练习
 */

/**
 * 题目一：假设你正在爬楼梯。需要 n 步你才能到达楼顶。
 *  每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * @param {number} n
 * @return {number}
 */
const map = new Map();
const climbStairs = function(n) {
    /* 
    1.百度之后发现类似斐波那契数列
        n = 4时
        如果走1步 
            n = 3
                走1步 → 还有2步 2步是2种方法
                走2步 → 还有1步 1步是1种方法
        如果走2步
            n = 2 → 2种方法 
        2+1+2 = 5
        由于直接递归会时间超时 于是用map记录已经计算过的数 提高效率
    */
    if(n == 2)return 2;
    if(n == 1)return 1;
    let n1,n2;
    if(map.has(n - 1)){
        n1 = map.get(n - 1);
    }else{
        n1 = climbStairs(n - 1);
        map.set(n - 1, n1)
    }
    if(map.has(n - 2)){
        n2 = map.get(n - 2);
    }else{
        n2 = climbStairs(n - 2);
        map.set(n - 2, n2)
    }
    return n1 + n2;
};
//console.log(climbStairs(45))

/**
 * 题目二：给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 *  如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
 *  注意你不能在买入股票前卖出股票。
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function(prices) {
    /* 
    1.和数组的股票2类似
        找出每一个高低直接的最高差值
    */
    /* let min, max = 0;
    if(prices.length > 1){
        min = prices[0];
        for (let index = 1; index < prices.length; index++) {
            const element = prices[index];
            if(element < min){
                min = element;
            }else if(element > min && element - min > max){
                max = element - min;
            }
        }
    }
    console.log(max);
    return max; */
    /* 
    2.leetcode最快的答案
     */
    let maxProfit = 0
    let minPrice = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < prices.length; i++){
        minPrice = Math.min(minPrice, prices[i])
        maxProfit = Math.max(maxProfit, prices[i] - minPrice)
    }
    return maxProfit
};
//maxProfit([5,2,6,1,3])

/**
 * 题目三：最大子序和。给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function(nums) {
    let now = max = nums[0];
    for (let index = 1; index < nums.length; index++) {
        if(now>0){//当前的累积和
            now+=nums[index];
        }else{
            now=nums[index];//累积和小于0 重新计数
        }
        max=Math.max(max,now);//

    }
    return max;  
};
/* maxSubArray([-2,1,-3,4,-1,2,1,-5,4])
maxSubArray([-4])
maxSubArray([-2,-1])
maxSubArray([1,1,-3,4,4,-5,4]) */

/**
 * 题目四：打家劫舍
 * 输入: [1,2,3,1]
 * 输出: 4
 * 解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
 *  偷窃到的最高金额 = 1 + 3 = 4 。
 * @param {number[]} nums
 * @return {number}
 */
const rob = function(nums) {
    const length = nums.length;
    if(length == 0){
        return 0;
    }else if(length == 1){
        return nums[0];
    }else if(length == 2){
        return Math.max(nums[0], nums[1]);
    }
    res = [];
    res[0] = nums[0];
    res[1] = Math.max(nums[0], nums[1]);//很关键 可以隔两个选 例如 1 0 0 8
    for (let i = 2; i < length; i++) {
        res[i]=Math.max(res[i-2]+nums[i],res[i-1]);//和之前记录下来的去比
    }
    return res[length - 1];
};
rob([1,0,0,8])