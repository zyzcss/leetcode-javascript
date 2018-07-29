/**
 * leetcode 链表部分的练习
 * 常用算法：双指针和递归
 */


/**
 * 题目一：给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function(head, n) {
    /* 
    1.用两个指针 一个指向next节点 一个指向next 前面n个的节点
        要考虑传进来[1] 1 把自身删除的情况
        [1,2] 2删除头节点的情况
    */
    let now = head, 
        k = 0,
        _head = head;
    /* 
    删除自身
    */
    if(!_head.next && n == 1){
        return [];
    }
    while(_head){
        if(k >= n){
            if(_head.next){
                now = now.next;
            }else{
                now.next = now.next.next;
            }
        }
        _head = _head.next;
        k++;
    }
    /* 
    删除头节点
    */
    if(now.val === head.val && k == n){
        head = head.next;
        return head;
    }
    return head;
};
//removeNthFromEnd({val: 1,next:{val: 2,next:{val:3,next:null}}}, 1);

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 题目二：反转一个单链表。
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function(node) {
    reverse(node);
};
function reverse(headList){
    let pNode = headList;//整个链表
    let pPrev = null;//反转时的前缀 由于最后是Null所以初始默认null
    let pNext;//每次截掉头之后 后面的链表
    while(pNode != null){
        pNext = pNode.next; //每次截一个 
        pNode.next = pPrev;  //当前头节点链表的下一个指向已经截取出来的部分
        pPrev = pNode; //赋值给头
        pNode = pNext; //重新赋值 循环
    }
    return pPrev ;  //return newHead
}
//reverseList({val: 1,next:{val: 2,next:{val:3,next:null}}});

/**
 * 题目三：合并两个有序链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function(l1, l2) {
    /* 
    首先匹配l1 l2 如果存在比较val的大小
        然后将node指针指向要取得值 取出并放入newNode 并且取的源链表删去头节点
        temp是指向newNode当前深度的指针
    */
    let newNode = null,
        next = null,
        temp,
        node = 1;
    if(l1 == null) return l2;
    if(l2 == null) return l1;
    while(l1 || l2){
        if(l1 && !l2 || l1 && l1.val < l2.val){
            node = l1;
            l1 = l1.next;
        }else{
            node = l2;
            l2 = l2.next;
        }
        next = node.next;
        node.next = null;
        if(newNode != null){
            temp.next = node;
        }else{
            newNode = node;
        }
        node =next;
        temp = newNode.next? temp.next: newNode;
    }
    return newNode;
};
//mergeTwoLists({val: 1,next:{val: 2,next:null}},{val: 0,next:null});
    
/**
 * 题目四：给定一个链表，判断链表中是否有环。
 *  进阶：你能否不使用额外空间解决此题？
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function(head) {
    /* 
    1.参考百度 不占用额外空间 使用快慢指针 有环则终会相遇
    */
    /* let fast = head,slow = head;
    if(head == null || head.next)return false;
    while(fast && fast.next){
        fast = fast.next.next;
        slow = slow.next;
        if(fast == slow)return true;
    }
    return false; */
    /* 
    2.遍历链表 每个遍历过的节点的下一个都指向自己
        如果有环则会遇到next==self的情况
    */
    if(head == null || head.next == null)return false;
    let node = head;
    while(node && node.next){
        if(node.next == node)return true;
        node = head.next;
        head.next = head;
        head = node;
    }
    return false;
};
//console.log(hasCycle({val: 1,next:{val: 2,next:{val:1,next:{val:2,next:{val:1,next:null}}}}}));

/**
 * 题目五：请判断一个链表是否为回文链表。
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = function(head) {
    /* 
    1.快慢指针 快指针到链表尽头的时候慢指针在链表中央
    将后半段链表倒序后和去匹配
    */
    if(head == null || head.next == null)return false;
    let slow = head,
        fast = head;
    while(fast){
        if(fast.next == null || fast.next.next == null){
            break;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    let behind = slow.next,
        pPrev = null,
        pNext;
    console.log(behind, fast)
    while(behind != null){
        pNext = behind.next; 
        behind.next = pPrev;
        pPrev = behind;
        behind = pNext;
    }
    while(pPrev && head){
        if(pPrev.val != head.val){
            return false;
        }
        pPrev = pPrev.next;
        head = head.next;
    }
    return true;
};
//console.log(isPalindrome({val: 1,next:{val: 2,next:{val:3,next:{val:3,next:{val:2,next:{val:1,next:null}}}}}}));