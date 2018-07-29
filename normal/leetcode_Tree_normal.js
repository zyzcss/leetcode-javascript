/**
 * leetcode 树和图部分 普通难度
 */

/**
 * 题目一：中序遍历
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = function(root) {
    const arr = [];
    order(root, arr);
    return arr;
};
function order(root, arr){
    if(root){
        order(root.left, arr);
        arr.push(root.val);
        order(root.right, arr);
    }
}
inorderTraversal({val:10,
    left:{val:5,left:null,right:null},
    right:{val:15,left:{val:9,left:null,right:null},right:{val:23,left:null,right:null}}
});


/**
 * 题目二：给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const zigzagLevelOrder = function(root) {
    const trees = [];
    if(root == null)return [];
    nextLine(root, 0, trees);
    console.log(trees);
    return trees;
};
const nextLine = function(root, line, trees){
    if(root){
        if(!trees[line])trees[line] = [];
        if(line % 2 == 1){
            trees[line].unshift(root.val);
        }else{
            trees[line].push(root.val);
        }
        if(root.left)nextLine(root.left, line + 1, trees);
        if(root.right)nextLine(root.right, line + 1, trees);
    }
}
/* zigzagLevelOrder({val:10,
    left:{val:5,left:null,right:null},
    right:{val:15,left:{val:9,left:null,right:null},right:{val:23,left:null,right:null}}
}) */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * 题目三：根据前序和中序遍历构造二叉树
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = function(preorder, inorder) {
    const tree = myBuildTree(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
    function findPosition(array, start, end, key) {
        for (let i = start; i <= end; i++) {
            if (array[i] == key) {
                return i;
            }
        }
        return -1;
    }
    function myBuildTree(preorder, preStart, preEnd, inorder, inStart, inEnd) {
        if (inStart > inEnd) {
            return null;
        }
        //前序遍历序列的第一个数字就是根结点，创建根结点root
        const root = new TreeNode(preorder[preStart]);
        //在中序遍历序列中找到根结点的位置
        let position = findPosition(inorder, inStart, inEnd, preorder[preStart]);
        //构建左子树
        root.left = myBuildTree(preorder, preStart + 1, preStart + (position - inStart), inorder, inStart, position - 1);
        //构建右子树
        root.right = myBuildTree(preorder, preStart + (position - inStart) + 1, preEnd, inorder, position + 1, inEnd);
        return root;
    }     
    console.log(tree);
    
    return tree;
};
//buildTree([1,2,3],[1,2,3])

/**
 * 题目四:补足每个节点的右向指针
 * Definition for binary tree with next pointer.
 * function TreeLinkNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.next = null;
 * }
 */

/**
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */
const connect = function(root) {
    inorder(root,null);
    function inorder(root, right){
        root.next = right;
        if(root.left){
            inorder(root.left, root.right);
        }
        if(root.right){
            inorder(root.right, right ? right.left : null);
        }
    }
};
/* connect({val:1,
    left:{val:2,left:{val:4,left:null,right:null,next:null},right:{val:5,left:null,right:null,next:null},next:null},
    right:{val:3,left:{val:6,left:null,right:null,next:null},right:{val:7,left:null,right:null,next:null},next:null},
    next:null
}) */

/**
 * 题目五：二叉搜索树中第K小的元素
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
const kthSmallest = function(root, k) {
    let _k = 0,
        val;
    pre(root)
    return val;
    function pre(root){
        if(root.left && _k != -1)pre(root.left);
        if(_k != -1)_k++;
        if(_k == k){
            console.log(root,k,_k);
            val = root.val;
            _k = -1;
            return;
        }
        if(root.right && _k != -1)pre(root.right);
    }   
};
/* console.log(kthSmallest({val:3,
    left:{val:1,left:null,right:{val:2,left:null,right:null,next:null},next:null},
    right:{val:4,left:null,right:{val:18,left:null,right:null,next:null},next:null},
    next:null
},1)); */

/**
 * 题目六：岛屿的个数
 *  给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function(grid) {
    /* 
    有一个测试用例没通过
        思路上感觉没什么错 可能还有一个欠考虑的地方
    */
    if(!grid.length || grid.length == 0)return 0;
    let sum = 0;
    const map = new Map(),
          row = grid.length,
          col = grid[0].length;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const element = grid[i][j],
                  position = i + '' + j;
            if(element == 1 && !map.has(position)){
                sum ++;
                console.log(i,j);
                pushGrid(i,j);
            }
        }
    }
    function pushGrid(i, j){
        const position = i + '' + j;
        if(grid[i][j] == 1 && !map.has(position)){
            map.set(position, 0);
            if(j > 0){
                pushGrid(i, j - 1)
            }
            if(j < col - 1){
                pushGrid(i, j + 1)
            }
            if(i > 0){
                pushGrid(i - 1, j)
            }
            if(i < row - 1){
                pushGrid(i + 1, j)
            }
        }
    }
    console.log(sum,map);
    return sum;
};
/* numIslands([
    [1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1]
]) */