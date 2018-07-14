import LinkedListNode from './LinkedListNode'
import Comparator from '../util/comparator'

export default class LinkedList {
  
  constructor (comparatorFunction) {
    this.head = null
    this.tail = null 
    this.compare = new Comparator(comparatorFunction)
  }
  /**
   * @param {*} value
   * @return {LinkedList}
   */
  prepend (value) {
    // Make new node to be head
    const newNode = new LinkedListNode(value)
    this.head = newNode
    if (!this.tail) {
      this.tail = newNode
    }
    return this
  }
  /**
   * @param {*} value
   * @return {LinkedList}
   */
  append (value) {
    const newNode = new LinkedListNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      return this
    }
    this.tail.next = newNode
    this.tail = newNode
    return this
  }
  /**
   * @param {*} value 
   * @return {LinkedListNode}
   */
  delete (value) {
    if (!this.head) {
      return null
    }
    let deleteNode = null
    // if the head must be deleted then make 2nd to be a head
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head
      this.head = this.head.next
    }
    let currentNode = this.head
    if (currentNode !== null) {
      // if next node must to be deleted then make next node to be next next one
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }
    // Check if tail must be deleted.
    // 相等才会在上面的循环中被删掉，这时需要重置this.tail
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }
    return deleteNode
  }
  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */ 
  find ({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null
    }
    let currentNode = this.head
    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      // If value is specified then try to compare by value.
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }
    return null
  }
  /**
   * @return {LinkedListNode}
   */
  deleteTail () {
    // one node
    if (this.head = this.tail) {
      const deleteTail = this.tail
      this.head = null
      this.tail = null
      return deleteTail
    }
    // many nodes
    const deleteTail = this.tail
    let currentNode = this.head
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }
    this.tail = currentNode
    return deleteTail
  }
  /**
   * @return {LinkedListNode}
   */
  deleteHead () {
    if (!this.head) {
      return null
    }
    const deleteHead = this.head
    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }
    return deleteHead
  }
  /**
   * @return {LinkedListNode[]}
   */
  toArray () {
    const nodes = []

    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }
    return nodes
  }
  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString (callback) {
    return this.toArray().map(node => node.toString(callback)).toString()
  }
  
}