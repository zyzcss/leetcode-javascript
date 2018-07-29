/**
 * leetcode 排序和搜索部分的练习
 */

/**
 * 题目一：给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function(nums1, m, nums2, n) {
    /* 
    1.nums2每次从头取出一个插入nums1中
    */
    let step = 0;
    for (let index = 0; index < m;) {
        const element = nums1[index + step];
        if(element > nums2[0]){
            nums1.splice(index + step, 0,nums2[0]);
            nums2.shift();
            step++;
        }else{
            index++;
        }
    }
    nums1.splice(m + step, n, ...nums2);//拼接多余的nums2
};
//merge([0],1,[],0);

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    let result = 0;
    const nextStep = function(start, end){
        const mid = Math.round((end + start)/2);
        let tag = isBadVersion(mid);
        if(mid - start > 1){
            if(tag){
                nextStep(start, mid);
            }else{
                if(isBadVersion(mid + 1)){
                    
                    result = mid + 1;
                }else{
                    nextStep(mid, end);
                }
            }
        }else{
            if(tag){
                result = mid;
            }else{
                result = mid + 1;
            }
        }
    }
    return function(n) {
        if(n > 1){
            nextStep(0, n);
            return result;
        }
        return n;
    };
};
console.log(solution(check)(2));
function check(n){
    if(n >= 1)return true;
    return false;
}