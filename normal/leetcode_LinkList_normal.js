/**
 * leetcode 链表部分 普通难度
 */

/**
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
const addTwoNumbers = function(l1, l2) {
    /* 
    1.遍历一遍l1 l2 放入数组中 然后从后开始逐位相加
        最后循环出一个链表
    */
    let num1 = [],
        num2 = [];
    while(l1 || l2){
        if(l1){
            num1.push(l1.val)
            l1 = l1.next;
        }
        if(l2){
            num2.push(l2.val);
            l2 = l2.next;
        }
    }
    if(num1.length < num2.length){
        [num2, num1] = [num1, num2];
    }
    let i = 0;
    let length = num1.length;
    while(i < length){
        if(num2[i])num1[i] += num2[i];
        if(num1[i] > 9){
            num1[i] -= 10;
            num1[i+1] ? num1[i+1] +=1 : num1[i+1] = 1;
        }
        i++;
    }
    length = num1.length;
    const node = new ListNode(parseInt(num1[0]));
    let _node = node;
    for (let index = 1; index < length;index++) {
        const val =  parseInt(num1[index]);
        _node.next = new ListNode(val);
        _node = _node.next;
    }
    return node;
};
function ListNode(val) {
    this.val = val;
    this.next = null;
}
/* addTwoNumbers({
        val:2,
        next:{val:4,next:{val:3,next:null}}
    },{
        val:5,
        next:{val:6,next:{val:6,next:null}}
}); */
    
/**
 * 题目二：给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const oddEvenList = function(head) {
    /* 
    1.蠢办法 快慢指针 一个指向奇一个指向偶 做一次连接一次
    */
    /* let slow = head,
        fast = head;
    while(fast && fast.next && fast.next.next){
        fast = fast.next.next;
        let _slow = slow.next,
            i = 0;
        while(_slow.next != fast){
            _slow = _slow.next;
            i++;
        }
        _slow.next = fast.next;
        fast.next = slow.next;
        slow.next = fast;
        slow = fast;
        while(i >= 0){
            i--;
            fast = fast.next;
        }
    }
    return head; */
    /* 
    2.leetcode较快的方法
    */
    let oddNode = head;//奇数的链表
    let evenNode = head.next;//偶数的链表
    let evenNodes = head.next;//偶数链表的头节点
    while (oddNode.next && evenNode.next) {
        oddNode.next = oddNode.next.next;//拼接奇链表
        evenNode.next = evenNode.next.next;//拼接偶链表
        
        oddNode = oddNode.next;
        evenNode = evenNode.next;
    }
    oddNode.next = evenNodes;//连接两个链表
    return head;
};
/* oddEvenList({
    val:1,next:{val:2,next:{val:3,next:{val:4,next:{val:5,next:null}}}}
}) */


/**
 * 题目三：相交链表
 *  找到两个单链表相交的起始节点。
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
const getIntersectionNode = function(headA, headB) {
    /* 
    遍历一遍
    */
    if(!headA || !headB)return null;
    let _headA = headA,
        _headB = headB,
        lengthA = 0,
        lengthB = 0;
    while(_headA || _headB){
        if(_headA){
            _headA = _headA.next;
            lengthA++;
        }
        if(_headB){
            _headB = _headB.next;
            lengthB++;
        }
    }
    _headA = headA;
    _headB = headB;
    let i = Math.abs(lengthA - lengthB);
    if(lengthA > lengthB){
        _headA = headA;
        _headB = headB;
    }else{
        _headA = headB;
        _headB = headA;
    }
    while(i > 0){
        i--;
        _headA = _headA.next;
    }
    while(_headA){
        if(_headA == _headB){
                return _headA;
        }else{
            _headA = _headA.next;
            _headB = _headB.next;
        }
    }
    return null;
}
getIntersectionNode(
    {
        val:3,next:{val:4,next:{val:5,next:null}}
    },
    {
        val:1,next:{val:2,next:{val:3,next:{val:4,next:{val:5,next:null}}}}
    }
)