/**
 * leetcode 数部分的练习
 *  树比链表稍微复杂，因为链表是线性数据结构，而树不是。 
 *  树的问题可以由广度优先搜索或深度优先搜索解决。 在本章节中，我们提供了一个对于练习广度优先遍历很好的题目。
 */

/**
 * 题目一：树的最大深度
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function(root) {
    /* 
    1.深度遍历所有树节点 用i记录是在第几行 max记录最高行
    */
    /* if(!root)return 0;
    let i = 1,
        max = 1;
    hasChrild(root);
    console.log(max);
    return max;
    function hasChrild(tree){
        i++;
        if(tree.left){
            if(max < i) max = i;
            hasChrild(tree.left);
            i--;
        }
        if(tree.right){
            if(max < i) max = i;
            hasChrild(tree.right);
            i--;
        }
    } */
    /* 
    2.leecode最多的答案 
        从最下面的节点一层层+1上来，比较左右子树长度后再返回长者
    */
    if(!root) { return 0; }
    const leftDepth = maxDepth(root.left) + 1;
    const rightDepth = maxDepth(root.right) + 1;
    console.log(root,leftDepth,rightDepth)
    return leftDepth > rightDepth ? leftDepth : rightDepth;
};
//console.log(maxDepth({val:1,left:{val:3,left:{val:4,left:null,right:{val:4,left:null,right:null}},right:null},right:{val:4,left:null,right:{val:4,left:null,right:{val:4,left:null,right:{val:4,left:null,right:null}}}}}));


/**
 * 题目二：给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 *  一个二叉搜索树具有如下特征：
 *      节点的左子树只包含小于当前节点的数。
 *      节点的右子树只包含大于当前节点的数。
 *      所有左子树和右子树自身必须也是二叉搜索树。
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function(root) {
    /* 
    1.中序遍历后将所有值放入数组中 如果是二叉搜索树则是从小到大的有序数组
    */
    /* let arr = [];
    inOrder(root, arr);
    console.log(arr);
    
    for(let i =0;i < arr.length - 1;i++){
        if(arr[i + 1] <= arr[i])return false;
    }
    return true; */
    /* 
    2.对于右子树的左节点、左子树的右节点
        保留父节点和父父节点，以此作为界限
      对于右子树的右节点，只需大于父节点
      对于左子树的左节点，只需小于父节点

    */
    return valid(root, -Number.MAX_VALUE, Number.MAX_VALUE);
};
/* const inOrder = function (node, arr) {
    //中序 左中右
    if (node) {
      inOrder(node.left, arr);
      arr.push(node.val)
      inOrder(node.right, arr);
    }
} */  
const valid = function(root, mn, mx) {
    if(!root) { return true; }
    if(root.val <= mn || root.val >= mx) { return false; }
    return valid(root.left, mn, root.val) && valid(root.right, root.val, mx);
}
/* console.log(isValidBST(
    {val:10,
        left:{val:5,left:null,right:null},
        right:{val:15,left:{val:9,left:null,right:null},right:{val:23,left:null,right:null}}
    })
); */

/**
 * 题目三：给定一个二叉树，检查它是否是镜像对称的
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isSymmetric = function(root) {
    /* 
    1.蠢办法 遍历中左右 和中右左 空的填充null 放入数组中
        如果不一致说明不是对称的
    */
    /* let arr1 = [],
        arr2 = [];
        inOrder1(root,arr1);
    if(arr1.length == 1)return true;
    inOrder2(root,arr2);
    console.log(arr1,arr2);
    for(let i = 0;i < arr1.length - 1;i++){
        if(arr1[i] != arr2[i])return false;
    }
    return true; */
    /* 
    用左子树的左节点和右子树的右节点 左子树的右节点和右子树的左节点比较
    */
    return helper(root, root)
};
/* const inOrder1 = function (node, arr) {
    if (node) {
        arr.push(node.val)
        inOrder1(node.left, arr);
        inOrder1(node.right, arr);
    }else{
        arr.push(null)
    }
}
const inOrder2 = function (node, arr) {
    if (node) {
        arr.push(node.val)
        inOrder2(node.right, arr);
        inOrder2(node.left, arr);
    }else{
        arr.push(null)
    }
} */
function helper(l, r) {
    if (l == null && r == null) return true;
    if (l == null || r == null) return false;
    return (l.val == r.val) && helper(l.left, r.right) && helper(l.right, r.left)
}
/* console.log(isSymmetric(
    {val:10,
        left:{val:5,left:{val:4,left:null,right:null},right:{val:4,left:null,right:null}},
        right:{val:5,left:null,right:{val:4,left:null,right:null}}
    }
)); */


/**
 * 题目四：给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 *
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function(root) {
    /* 
    1.深度遍历，但是每次存储行数 来作为数组的下标
    */
    const trees = [];
    if(root == null)return [];
    nextLine(root, 0, trees);
    console.log(trees);
    return trees;
};
const nextLine = function(root, line, trees){
    if(root){
        if(!trees[line])trees[line] = [];
        trees[line].push(root.val);
        if(root.left)nextLine(root.left, line + 1, trees);
        if(root.right)nextLine(root.right, line + 1, trees);
    }
}
/* levelOrder({val:10,
    left:{val:5,left:{val:1,left:null,right:null},right:{val:2,left:{val:4,left:null,right:null},right:null}},
    right:{val:6,left:null,right:{val:4,left:null,right:null}}
}); */

/**
 * 题目五：将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
 *  本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
const sortedArrayToBST = function(nums) {
    /* 
    1.由于输入时排序的数组 要变成搜索树还是很容易的
        每次取数组中间的值为当前节点值，以此为分隔，左边是左子树，右边是右子树，遍历即可
    */
    if(!nums.length || nums.length < 1){
        return null;
    }
    return listToTree(new TreeNode(), nums);
    function listToTree(root, arr){
        if(arr){
            const length = arr.length;
            root.val = arr[Math.floor(length/2)];
            root.left = new TreeNode();
            root.right = new TreeNode();
            if(length > 2){
                listToTree(root.left, arr.slice(0, Math.floor(length/2)))
                listToTree(root.right, arr.slice(Math.floor(length/2) + 1))
            }else{
                if(length == 2){
                    root.left.val = arr[0];
                    root.right = null;
                }else{
                    root.left = null;
                    root.right = null;
                }
            }
        }
        return root;
    }
};
//console.log(sortedArrayToBST([-10]));


